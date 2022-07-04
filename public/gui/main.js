import * as Module from "../../src/module.js";
import {unfreeze, freeze} from "../loop.js";

export let renderedScene;
export let FRAMES_PER_SECOND = 60; // Number of frames per second (0 = no frame loop)
let isRendering = false;

export const initGUI = (scenes, meshes) => {
	const header = gui.firstElementChild;

	const rendererMenu = createMenu({
		title: "Renderer",
		contentTemplate: template.content.querySelector(".renderer-properties"),
		visible: false,
	});

	const sceneMenu = createMenu({
		title: "Scenes",
		actions: {
			new: "[New]",
		},
		contentTemplate: template.content.querySelector("table.table-scene"),
		visible: true,
	});
	sceneMenu.actions.new.addEventListener("click", () => createScene(scenes, sceneMenu));

	const meshMenu = createMenu({
		title: "Meshes",
		actions: {
			new2d: "[2D]",
		},
		contentTemplate: template.content.querySelector("table.table-mesh"),
		visible: true,
	});
	meshMenu.actions.new2d.addEventListener("click", () => createMesh2D(meshes, meshMenu, scenes));

	const settingMenu = createMenu({
		title: "Settings",
		actions: {
			close: "[Close]",
		},
		contentTemplate: template.content.querySelector(".properties.settings"),
		visible: false,
	});
	settingMenu.actions.close.addEventListener("click", () => settingMenu.toggle());
	initSettings(settingMenu);

	header.querySelector("button.toggle-renderer").addEventListener("click", () => rendererMenu.toggle());
	header.querySelector("button.toggle-scenes").addEventListener("click", () => sceneMenu.toggle());
	header.querySelector("button.toggle-meshes").addEventListener("click", () => meshMenu.toggle());
	header.querySelector("button.toggle-settings").addEventListener("click", () => settingMenu.toggle());

	// Fill scene list
	for (const scene of scenes) {
		createScene(scenes, sceneMenu, scene);
	}

	// Fill mesh list
	for (const mesh of meshes) {
		let linkedScene;

		for (const scene of scenes) {
			if (scene.meshes.has(mesh)) {
				linkedScene = scene;
				break;
			}
		}

		if (mesh.geometry.type === "plane") createMesh2D(meshes, meshMenu, scenes, mesh, linkedScene);
	}
};

const
	toggleInterface = () => gui.classList.toggle("visible"),
	createMenu = options => {
		const menu = template.content.querySelector(".gui-menu").cloneNode(true);
		menu.header = menu.firstElementChild;
		menu.content = menu.lastElementChild;

		menu.header.firstElementChild.textContent = options.title;

		menu.actions = [];
		if (options.actions) {
			for (const action of Object.entries(options.actions)) {
				const button = document.createElement("button");
				button.style.margin = "0 2px";
				button.textContent = action[1];

				menu.actions[action[0]] = button;
				menu.header.lastElementChild.appendChild(button);
			}
		}

		if (options.contentTemplate) {
			let content = options.contentTemplate.cloneNode(true);
			if (content.tagName === "TABLE") {
				content.firstElementChild.firstElementChild.remove(); // Remove the base row
				menu.table = content.firstElementChild;
			}

			menu.content.appendChild(content);
		}

		menu.toggle = (state = menu.style.display !== "block") => {
			menu.style.display = state ? "block" : "none";
		};
		menu.toggle(options.visible ?? true);

		gui.appendChild(menu);

		return menu;
	},
	deleteMenu = menu => {
		menu.remove();
		menu = null;
	},
	createScene = (scenes, sceneMenu, scene) => {
		if (!scene) {
			scene = new Module.Scene();
			scene.name = "Scene";
			scenes.add(scene);
		}

		scene.name ??= "Scene";

		const sceneEditMenu = createMenu({
			title: scene.name + " Properties",
			actions: {
				close: "[Close]",
			},
			contentTemplate: template.content.querySelector(".scene-properties"),
			visible: false,
		});
		const row = addSceneRow(sceneMenu, scenes, scene, sceneEditMenu);
		sceneEditMenu.actions.close.addEventListener("click", () => sceneEditMenu.toggle());
		sceneEditMenu.querySelector(".input-scene-name").addEventListener("change", function() {
			scene.name = this.value;
			row.querySelector(".properties").textContent = scene.name;
			sceneEditMenu.header.firstElementChild.textContent = scene.name + " Properties";
			updateMeshSceneSelects(scenes);
		});
		sceneEditMenu.querySelector(".input-scene-background").value = scene.background.hexadecimal;
		sceneEditMenu.querySelector(".input-scene-background").addEventListener("change", function() {
			scene.background = new Module.Color(+`0x${this.value.substring(1)}`);
		});
		updateMeshSceneSelects(scenes);
	},
	addSceneRow = (sceneMenu, scenes, scene, sceneEditMenu) => {
		const row = template.content.querySelector("tr.scene").cloneNode(true);
		row.querySelector(".properties").textContent = scene.name;
		row.querySelector(".properties").addEventListener("click", () => sceneEditMenu.toggle());
		row.querySelector("button.render").addEventListener("click", function() {
			if (this.classList.contains("stopped")) {
				isRendering = true;

				if (renderedScene) {
					// Another scene is being rendered, just change it
					renderedScene = scene;

					document.querySelectorAll("tr button.render").forEach(button => {
						button.textContent = "Render";
						button.classList.add("stopped");
						button.classList.remove("rendering");
					});

					this.textContent = "Stop";
					this.classList.remove("stopped");
					this.classList.add("rendering");

					return console.info("Switched scene:", scene.name);
				}

				this.textContent = "Stop";
				this.classList.remove("stopped");
				this.classList.add("rendering");

				renderedScene = scene;
				console.info("Started rendering scene", scene.name, `(${FRAMES_PER_SECOND} FPS)`);
				unfreeze();
			} else {
				isRendering = false;

				this.textContent = "Render";
				this.classList.remove("rendering");
				this.classList.add("stopped");

				freeze();
				renderedScene = null;
			}
		});
		row.querySelector("button.delete").addEventListener("click", () => deleteScene(scenes, scene, row, sceneEditMenu));

		sceneMenu.table.appendChild(row);

		return row;
	},
	deleteScene = (scenes, scene, row, sceneEditMenu) => {
		if (renderedScene === scene) {
			renderedScene = null;
			freeze();
		}

		scenes.delete(scene);
		scene = null;
		row.remove();
		deleteMenu(sceneEditMenu);
		updateMeshSceneSelects(scenes);
	},
	createMesh2D = (meshes, meshMenu, scenes, mesh, linkedScene) => {
		if (!mesh) {
			mesh = new Module.Mesh(
				new Module.PlaneGeometry(1),
				new Module.Material({color: new Module.Color(0x555555)}),
			);
			mesh.name = "Plane";
		}

		mesh.name ??= "Plane";

		const meshEditMenu = createMenu({
			title: mesh.name + " Properties",
			actions: {
				close: "[Close]",
			},
			contentTemplate: template.content.querySelector(".mesh2d-properties"),
			visible: false,
		});
		meshEditMenu.actions.close.addEventListener("click", () => meshEditMenu.toggle());
		meshEditMenu.querySelector(".input-mesh-name").addEventListener("change", function() {
			mesh.name = this.value;
			row.querySelector(".properties").textContent = mesh.name;
			meshEditMenu.header.firstElementChild.textContent = mesh.name + " Properties";
		});
		meshEditMenu.querySelector(".input-mesh-color").value = mesh.material.color.hexadecimal();
		meshEditMenu.querySelector(".input-mesh-color").addEventListener("change", function() {
			mesh.material = new Module.Material({color: new Module.Color(+`0x${this.value.substring(1)}`)});
		});
		updateMeshSceneSelects(scenes);
		if (linkedScene) linkMeshToScene(scenes, mesh, linkedScene, meshEditMenu.querySelector(".input-mesh-scene"));
		meshEditMenu.querySelector(".input-mesh-scene").addEventListener("change", function() {
			for (const scene of scenes) scene.remove(mesh);

			if (!this.value) return;

			const selectedScene = [...scenes][+this.value];
			selectedScene.add(mesh);
		});
		meshEditMenu.querySelector(".input-mesh-px").oninput = function() {mesh.position.x = +this.value};
		meshEditMenu.querySelector(".input-mesh-py").oninput = function() {mesh.position.y = +this.value};
		meshEditMenu.querySelector(".input-mesh-pz").oninput = function() {mesh.position.z = +this.value};
		meshEditMenu.querySelector(".input-mesh-rx").oninput = function() {mesh.rotation.x = rad(+this.value)};
		meshEditMenu.querySelector(".input-mesh-ry").oninput = function() {mesh.rotation.y = rad(+this.value)};
		meshEditMenu.querySelector(".input-mesh-rz").oninput = function() {mesh.rotation.z = rad(+this.value)};

		const row = template.content.querySelector("tr.mesh").cloneNode(true);
		row.querySelector(".properties").textContent = mesh.name;
		row.querySelector(".properties").addEventListener("click", () => meshEditMenu.toggle());
		row.querySelector("button.delete").addEventListener("click", () => deleteMesh(meshes, mesh, row, meshEditMenu, scenes));

		meshMenu.table.appendChild(row);
	},
	deleteMesh = (meshes, mesh, row, meshEditMenu, scenes) => {
		for (const scene of scenes) scene.remove(mesh);

		meshes.delete(mesh);
		mesh = null;
		row.remove();
		deleteMenu(meshEditMenu);
	},
	updateMeshSceneSelects = scenes => {
		const selects = document.querySelectorAll("select.input-mesh-scene");

		for (const select of selects) {
			select.innerHTML = "<option value=''></option>";

			for (let i in [...scenes]) {
				const option = document.createElement("option");
				option.text = [...scenes][i].name;
				option.value = i;
				select.appendChild(option);
			}
		}
	},
	linkMeshToScene = (scenes, mesh, scene, select) => {
		for (const option of select.options) {
			if (option.value === "") continue;

			if ([...scenes][option.value] === scene) select.value = option.value;
		}
	},
	initSettings = settingMenu => {
		settingMenu.querySelector("#setting-fps").addEventListener("change", function() {
			FRAMES_PER_SECOND = +this.value;

			if (isRendering) {
				// Re-render with the new FPS value
				freeze();
				unfreeze();
			}
		});
	},
	rad = deg => deg * Math.PI / 180;

addEventListener("keydown", e => {
	e.code === "F2" && toggleInterface();
});
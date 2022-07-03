import * as Module from "../../src/module.js";
import {unfreeze, freeze} from "../loop.js";

export let renderedScene;

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
		visible: false,
	});
	sceneMenu.actions.new.addEventListener("click", () => createScene(scenes, sceneMenu));

	const meshMenu = createMenu({
		title: "Meshes",
		actions: {
			new2d: "[2D]",
			// new3d: "[3D]",
		},
		contentTemplate: template.content.querySelector("table.table-mesh"),
	});
	meshMenu.actions.new2d.addEventListener("click", () => createMesh2D(meshes, meshMenu));

	header.querySelector("button.toggle-renderer").addEventListener("click", () => rendererMenu.toggle());
	header.querySelector("button.toggle-scenes").addEventListener("click", () => sceneMenu.toggle());
	header.querySelector("button.toggle-meshes").addEventListener("click", () => meshMenu.toggle());
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
	createScene = (scenes, sceneMenu) => {
		let scene = new Module.Scene();
		scene.name = "Scene";
		scenes.add(scene);

		const sceneEditMenu = createMenu({
			title: "Scene Properties",
			actions: {
				close: "[Close]",
			},
			contentTemplate: template.content.querySelector(".scene-properties"),
			visible: false,
		});
		sceneEditMenu.actions.close.addEventListener("click", () => sceneEditMenu.toggle());
		sceneEditMenu.querySelector(".input-scene-name").addEventListener("change", function() {
			scene.name = this.value;
			row.querySelector(".properties").textContent = scene.name;
			sceneEditMenu.header.firstElementChild.textContent = scene.name + " Properties";
		});
		sceneEditMenu.querySelector(".input-scene-background").addEventListener("change", function() {
			scene.background = new Module.Color(+`0x${this.value.substring(1)}`);
		});

		const row = template.content.querySelector("tr.scene").cloneNode(true);
		row.querySelector(".properties").textContent = scene.name;
		row.querySelector(".properties").addEventListener("click", () => sceneEditMenu.toggle());
		row.querySelector("button.render").addEventListener("click", function() {
			if (this.classList.contains("stopped")) {
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
				console.info("Started rendering scene", scene.name);
				unfreeze();
			} else {
				this.textContent = "Render";
				this.classList.remove("rendering");
				this.classList.add("stopped");

				freeze();
				renderedScene = null;
			}
		});
		row.querySelector("button.delete").addEventListener("click", () => deleteScene(scenes, scene, row, sceneEditMenu));

		sceneMenu.table.appendChild(row);
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
	},
	createMesh2D = (meshes, meshMenu) => {
		let mesh = new Module.Mesh(
			new Module.PlaneGeometry(1),
			new Module.Color(0x555555),
		);
		mesh.name = "Plane";
		meshes.add(mesh);

		const meshEditMenu = createMenu({
			title: "Plane Properties",
			actions: {
				close: "[Close]",
			},
			// contentTemplate: template.content.querySelector(".mesh-properties"),
			visible: false,
		});
		meshEditMenu.actions.close.addEventListener("click", () => meshEditMenu.toggle());

		const row = template.content.querySelector("tr.mesh").cloneNode(true);
		row.querySelector(".properties").textContent = mesh.name;
		row.querySelector(".properties").addEventListener("click", () => meshEditMenu.toggle());

		meshMenu.table.appendChild(row);
	};

addEventListener("keydown", e => {
	e.preventDefault();
	e.code === "F1" && toggleInterface();
});
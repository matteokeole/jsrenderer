import * as Lib from "../../core/lib.js";

export const GUI = {
	init: () => {
		initCSSVars();
		initButtons();

		addEventListener("resize", resize);
		resize();
	},
};

let POINTER_X,
	POINTER_Y,
	SCENES = new Set(),
	Template = {
		sceneRow: template.content.querySelector("tr.scene"),
	},
	Library = {
		table: library.querySelector("table"),
	},
	headerHeight = header.offsetHeight,
	statusHeight = document.querySelector("#status").offsetHeight,
	headerTrigger = headerHeight,
	headerTriggerOff = headerHeight * 2,
	isFullScreen = document.body.classList.contains("fullscreen"),
	resize = () => {
		if (matchMedia("(max-width: 720px)").matches) {
			// Mobile
			removeEventListener("keydown", keydown);
			removeEventListener("mousemove", mousemove);
		} else {
			// Desktop
			addEventListener("keydown", keydown);
			addEventListener("mousemove", mousemove);
		}
	},
	keydown = e => e.code === "F10" && toggleFullScreen(e),
	mousemove = e => {
		POINTER_X = e.clientX;
		POINTER_Y = e.clientY;

		if (isFullScreen) {
			POINTER_Y < headerTrigger && header.classList.add("visible");
			POINTER_Y > headerTriggerOff && header.classList.remove("visible");
		}
	},
	toggleFullScreen = e => {
		e.preventDefault();

		isFullScreen = !isFullScreen;

		document.body.classList.toggle("fullscreen", isFullScreen);
		header.classList.toggle("visible", isFullScreen && POINTER_Y < headerTrigger);
	},
	initCSSVars = () => {
		// Get root element
		const root = document.documentElement;

		root.style.setProperty("--header-height", `${headerHeight}px`);
		root.style.setProperty("--status-height", `${statusHeight}px`);
	},
	initButtons = () => {
		// Retrieve button types
		const
			adds = document.querySelectorAll("button.add"),
			switches = document.querySelectorAll("button.switch"),
			expands = document.querySelectorAll("button.expand");

		for (const button of adds) {
			let secondaryFunction;

			if (button.dataset.function === "create-scene") secondaryFunction = createScene;

			button.addEventListener("click", function() {
				this.classList.toggle("switched");

				secondaryFunction && secondaryFunction(this);
			});
		}

		for (const button of switches) {
			let secondaryFunction;

			if (button.dataset.function === "switch-explorer") secondaryFunction = button => {
				explorer.classList.toggle("visible", button.classList.contains("switched"));
			};

			button.addEventListener("click", function() {
				this.classList.toggle("switched");

				secondaryFunction && secondaryFunction(this);
			});
		}

		for (const button of expands) {
			let secondaryFunction;

			button.addEventListener("click", function() {
				this.classList.toggle("expanded");
				this.parentNode.classList.toggle("expanded", this.classList.contains("expanded"));

				secondaryFunction && secondaryFunction(this);
			});
		}
	},
	createScene = () => {
		const scene = new Lib.Scene();
		Lib.UUID.call(scene);

		createSceneRow(scene);

		SCENES.add(scene);
	},
	createSceneRow = scene => {
		const row = Template.sceneRow.cloneNode(true);

		row.children[2].textContent = scene.name ?? "Untitled Scene";

		Library.table.appendChild(row);
	};
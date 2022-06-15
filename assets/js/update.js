import {switchCamera} from "./main.js";
import {currentCamera} from "./PerspectiveCamera.js";
import {keys} from "./input-handler.js";
import {Keybind, VELOCITY} from "./vars.js";
import render from "./render.js";

export default () => {
	if (keys.has(Keybind.nextCamera)) {
		keys.delete(Keybind.nextCamera);

		switchCamera();
	}

	if (keys.has(Keybind.forward))	currentCamera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	currentCamera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		currentCamera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	currentCamera.moveRight(VELOCITY);
	if (keys.has(Keybind.ascend))	currentCamera.position.y += VELOCITY;
	if (keys.has(Keybind.descend))	currentCamera.position.y -= VELOCITY;

	render(canvas, currentCamera);
};
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

	keys.has(Keybind.forward)	&& currentCamera.moveForward(VELOCITY);
	keys.has(Keybind.backward)	&& currentCamera.moveForward(-VELOCITY);
	keys.has(Keybind.left)		&& currentCamera.moveRight(-VELOCITY);
	keys.has(Keybind.right)		&& currentCamera.moveRight(VELOCITY);
	keys.has(Keybind.ascend)	&& currentCamera.ascend(VELOCITY);
	keys.has(Keybind.descend)	&& currentCamera.ascend(-VELOCITY);

	render(canvas, currentCamera);
};
import {Keybind, VELOCITY} from "./config.js";
import {keys, camera} from "./main.js";

export default () => {
	velocity = (keys.has(Keybind.forward) || keys.has(Keybind.backward)) && (keys.has(Keybind.left) || keys.has(Keybind.right)) ?
		Math.sqrt(VELOCITY) / 4 :
		VELOCITY;

	if (keys.has(Keybind.forward))	camera.moveForward(velocity);
	if (keys.has(Keybind.backward))	camera.moveForward(-velocity);
	if (keys.has(Keybind.left))		camera.moveRight(-velocity);
	if (keys.has(Keybind.right))	camera.moveRight(velocity);
	if (keys.has(Keybind.up))		camera.moveUp(velocity);
	if (keys.has(Keybind.down))		camera.moveUp(-velocity);
};

let velocity;
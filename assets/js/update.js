import {camera} from "./init.js";
import {keys} from "./input-handler.js";
import {Keybind, VELOCITY} from "./vars.js";
import render from "./render.js";

export default () => {
	keys.has(Keybind.forward)	&& camera.moveForward(VELOCITY);
	keys.has(Keybind.backward)	&& camera.moveForward(-VELOCITY);
	keys.has(Keybind.left)		&& camera.moveRight(-VELOCITY);
	keys.has(Keybind.right)		&& camera.moveRight(VELOCITY);

	render();

	debug1.innerText = camera.position.toString();
	debug2.innerText = camera.rotation.map(a => a.toFixed(2)).join(" / ");
};
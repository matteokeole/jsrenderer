import {ctx} from "./main.js";
import {camera} from "./init.js";
import {keys} from "./input-handler.js";
import {SCREEN, VELOCITY, Keybind} from "./vars.js";
import render from "./render.js";

export default () => {
	// Clear the canvas
	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	keys.has(Keybind.forward)	&& camera.moveForward(VELOCITY);
	keys.has(Keybind.backward)	&& camera.moveForward(-VELOCITY);
	keys.has(Keybind.left)		&& camera.moveRight(-VELOCITY);
	keys.has(Keybind.right)		&& camera.moveRight(VELOCITY);

	render();

	// debug1.innerText = camera.position.map(_ => _.toFixed(2)).join(" / ");
	// debug2.innerText = camera.rotation.map(_ => _.toFixed(2)).join(" / ");
};
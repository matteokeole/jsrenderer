import {Keybind, VELOCITY} from "./config.js";
import {renderer, scene, camera, keys} from "./main.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);
	if (keys.has(Keybind.ascend))	camera.position.y += VELOCITY;
	if (keys.has(Keybind.descend))	camera.position.y -= VELOCITY;

	renderer.render(scene, camera);
};
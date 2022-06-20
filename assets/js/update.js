import {Keybind, VELOCITY} from "./config.js";
import {keys, renderer, scene, camera, rotatedCube} from "./main.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);
	if (keys.has(Keybind.ascend))	camera.position.y += VELOCITY;
	if (keys.has(Keybind.descend))	camera.position.y -= VELOCITY;

	rotatedCube.rotation.x -= .02;
	rotatedCube.rotation.y -= .01;

	renderer.render(scene, camera);
};
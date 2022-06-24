import {Keybind, VELOCITY} from "./config.js";
import {camera, keys, scene} from "./main.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);
	if (keys.has(Keybind.up))		camera.position.y += VELOCITY;
	if (keys.has(Keybind.down))		camera.position.y -= VELOCITY;

	[...scene.meshes][2].rotation.x -= .01;
	[...scene.meshes][2].rotation.y -= .01;
};
import {Keybind, VELOCITY} from "./config.js";
import {keys} from "./events.js";
import {camera, animatedCube} from "./main.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);
	if (keys.has(Keybind.up))		camera.position.y += VELOCITY;
	if (keys.has(Keybind.down))		camera.position.y -= VELOCITY;

	animatedCube.rotation.x -= .01;
	animatedCube.rotation.y -= .02;
};
import {Keybind, VELOCITY} from "./config.js";
import {keys} from "./events.js";
import {camera, player} from "./main.js";
import collide from "./collide.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);
	if (keys.has(Keybind.up))		camera.position.y += VELOCITY;
	if (keys.has(Keybind.down))		camera.position.y -= VELOCITY;

	player.position.y = 2.003 / 2;

	collide();
};
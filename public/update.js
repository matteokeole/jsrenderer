import {Keybind, VELOCITY} from "./config.js";
import {keys} from "./events.js";
import {camera} from "./main.js";
// import {GUI} from "./gui/main.js";

export default () => {
	if (keys.has(Keybind.forward))	camera.moveForward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.moveForward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.moveRight(-VELOCITY);
	if (keys.has(Keybind.right))	camera.moveRight(VELOCITY);

	if (keys.has(Keybind.up))		{
		camera.position.y += VELOCITY;

		// GUI.updateProperties({py: camera.position.y});
	}

	if (keys.has(Keybind.down))		{
		camera.position.y -= VELOCITY;

		// GUI.updateProperties({py: camera.position.y});
	}
};
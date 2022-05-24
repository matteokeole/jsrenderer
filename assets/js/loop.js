import {FRAMERATE} from "./vars.js";
import update from "./update.js";

export default function loop() {
	requestAnimationFrame(loop);

	if (frames-- <= 0) {
		frames = FRAMERATE;

		update();
	}
};

let frames = 0;
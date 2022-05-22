import {FRAMERATE} from "./vars.js";
import update from "./update.js";

export default function loop() {
	if (--frames <= 0) {
		frames = FRAMERATE;
		update();
	}

	requestAnimationFrame(loop);
};

let frames = 0;
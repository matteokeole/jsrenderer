import {FRAMES_PER_SECOND} from "./config.js";
import update from "./update.js";
import {renderer, scene, camera} from "./main.js";
import {renderedScene} from "./gui/main.js";

export default function loop() {
	request = requestAnimationFrame(loop);

	let now = performance.now(),
		diff = now - then;

	if (CURRENT_FRAME === 0 || diff > int) {
		// Adjust the interval
		then = now - diff % int;

		ELAPSED = then - start;
		CURRENT_FRAME++;

		update();
		renderer.render(renderedScene, camera);
	}
};
export const
	unfreeze = () => {
		// Reset loop data
		CURRENT_FRAME = 0;
		start = performance.now();
		then = start;

		window["loop-off"].style.display = "none";

		loop();
	},
	freeze = () => {
		cancelAnimationFrame(request);

		renderer.clear();
		window["loop-off"].style.display = "block";
	};
export let
	ELAPSED, // Elapsed time (ms) since the start of the loop
	CURRENT_FRAME = 0; // Number of the current frame

let int = 1000 / FRAMES_PER_SECOND,
	request,
	start,
	then;
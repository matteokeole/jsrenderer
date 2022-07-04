import {FRAMES_PER_SECOND, renderedScene} from "./gui/main.js";
import update from "./update.js";
import {renderer, scene, camera} from "./main.js";

export default function loop() {
	request = requestAnimationFrame(loop);

	let now = performance.now(),
		diff = now - then;

	if (CURRENT_FRAME === 0 || diff > interval) {
		// Adjust the interval
		then = now - diff % interval;

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
		interval = 1000 / FRAMES_PER_SECOND;
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

let interval, start, then, request;
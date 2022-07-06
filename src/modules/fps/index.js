/**
 * Return the FPS count.
 */
export function counter() {
	let now = performance.now(),
		difference = now - start;

	// Increment frame count
	frames++;

	if (difference > delay) {
		update.i++;

		// Reset values
		start = now;
		frames = 0;
	}

	request = requestAnimationFrame(counter);
};

let frames = 0,
	start = performance.now(),
	delay = 1000,
	update = new Proxy({i: 0}, {
		set() {
			console.info("Updated");

			return true;
		},
	}),
	request;
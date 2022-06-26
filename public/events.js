import {renderer, camera} from "./main.js";

export const keys = new Set();

const
	pressKeys = e => {
		e.preventDefault();

		keys.add(e.code);
	},
	releaseKeys = e => {
		e.preventDefault();

		keys.delete(e.code);
	},
	pointerLockChange = () => {
		// Check if the cursor is locked on this renderer
		if (renderer.isLocked()) {
			addEventListener("keydown", pressKeys);
			addEventListener("keyup", releaseKeys);
			addEventListener("mousemove", camera.lookAround);
		} else {
			removeEventListener("keydown", pressKeys);
			removeEventListener("keyup", releaseKeys);
			removeEventListener("mousemove", camera.lookAround);

			keys.clear();
		}
	};

addEventListener("resize", () => {
	// renderer.stretch();

	// Update camera aspect ratio
	camera.aspect = renderer.width / renderer.height;
	camera.updateProjectionMatrix();
});

addEventListener("click", e => {
	if (e.target === renderer.canvas) renderer.lock();
});

// addEventListener("pointerlockchange") doesn't fire in some browsers if it's not preceded by document.
document.addEventListener("pointerlockchange", pointerLockChange);
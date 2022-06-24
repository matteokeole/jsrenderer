import {renderer, camera, keys, pressKeys, releaseKeys} from "./main.js";

fov.addEventListener("input", function() {
	let fov = +this.value;
	this.nextElementSibling.textContent = fov;
	camera.fov = fov;
	camera.updateProjectionMatrix();
});

addEventListener("resize", () => {
	renderer.stretch();
	camera.aspect = renderer.width / renderer.height;
	camera.updateProjectionMatrix();
});

addEventListener("click", e => {
	if (e.target === renderer.canvas) renderer.lock();
});

// addEventListener("pointerlockchange") doesn't fire in some browsers, must be preceded by document
document.addEventListener("pointerlockchange", () => {
	// Check if the cursor is locked on this renderer
	if (renderer.isLocked()) {
		addEventListener("keydown", pressKeys);
		addEventListener("keyup", releaseKeys);
		addEventListener("mousemove", camera.lookAround);
	} else {
		removeEventListener("keydown", pressKeys);
		removeEventListener("keyup", releaseKeys);
		removeEventListener("mousemove", camera.lookAround);

		// Avoid infinite movement by clearing the key set
		keys.clear();
	}
});
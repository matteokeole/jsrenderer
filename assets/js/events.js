import {renderer, lookAround, keys, pressKeys, releaseKeys} from "./main.js";

const pointerLockUpdate = () => {
	if (renderer.isLocked()) {
		addEventListener("keydown", pressKeys);
		addEventListener("keyup", releaseKeys);
		addEventListener("mousemove", lookAround);
	} else {
		removeEventListener("keydown", pressKeys);
		removeEventListener("keyup", releaseKeys);
		removeEventListener("mousemove", lookAround);
		keys.clear();
	}
};

addEventListener("resize", () => {
	renderer.stretch();
	renderer.ctx.strokeStyle = "#fef953";
});

addEventListener("click", e => {
	if (e.target === renderer.canvas) renderer.lock();
});

addEventListener("pointerlockchange", pointerLockUpdate);
addEventListener("mozpointerlockchange", pointerLockUpdate);
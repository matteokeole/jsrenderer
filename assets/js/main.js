import {SCREEN, Keybind} from "./vars.js";
import {default as init} from "./init.js";
import loop from "./loop.js";
import resize from "./resize.js";
import {pressKeys, releaseKeys} from "./input-handler.js";
import {currentCamera} from "./Camera.js";

/**
 * Vanilla JavaScript 3D rendering engine
 * 
 * Controls:
 * [W]	Walk forward
 * [S]	Walk backward
 * [A]	Strafe left
 * [D]	Strafe right
 * [F1]	Toggle camera
 * 
 * @version 0.0.1
 * 
 * @see {link https://github.com/matteokeole/3DJSEngine}
 * @see {link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {link https://www.sitepoint.com/building-3d-engine-javascript/}
 * @see {link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * 
 * @todo Fix multiple camera & camera switching
 * @todo Mobile controls
 */
export const
	ctx = canvas.getContext("2d"),
	cameras = new Set(),
	meshes = new Set(),
	pointerLockUpdate = () => {
		if (
			canvas === document.pointerLockElement ||
			canvas === document.mozPointerLockElement
		) {
			canvas.addEventListener("mousemove", rotateCamera);
			addEventListener("keydown", pressKeys);
			addEventListener("keyup", releaseKeys);
		} else {
			canvas.removeEventListener("mousemove", rotateCamera);
			removeEventListener("keydown", pressKeys);
			removeEventListener("keyup", releaseKeys);
		}
	},
	switchCamera = () => {
		camIndex + 1 >= cameras.size ? camIndex = 0 : camIndex++;
		const camera = [...cameras][camIndex];
		camera.setCurrent();
	},
	rotateCamera = e => currentCamera.addRotation(
		-e.movementY / SCREEN.HEIGHT,
		e.movementX / SCREEN.WIDTH,
		0,
	);

// Stretch the canvas to the screen size
canvas.width = SCREEN.MAX_WIDTH;
canvas.height = SCREEN.MAX_HEIGHT;

ctx.strokeStyle = "#fef953";

init();

let camIndex = [...cameras].indexOf(currentCamera);

loop();

addEventListener("resize", resize);
addEventListener("pointerlockchange", pointerLockUpdate);
addEventListener("mozpointerlockchange", pointerLockUpdate);

// Pointer lock request event
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.addEventListener("click", function() {
	this.requestPointerLock();
});
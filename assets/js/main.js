import {SCREEN} from "./vars.js";
import {camera, default as init} from "./init.js";
import loop from "./loop.js";
import resize from "./resize.js";
import {pressKeys, releaseKeys} from "./input-handler.js";

/**
 * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,
 * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,
 * loquacious, garrulous, chatty, extended, babbling description.
 * 
 * @summary Vanilla JavaScript 3D rendering engine
 * 
 * @version 0.0.1
 * 
 * @see {link https://github.com/matteokeole/3DJSEngine}
 * @see {link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {link https://www.sitepoint.com/building-3d-engine-javascript/}
 * @see {link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * 
 * @todo Replace point arrays by vertices
 * @todo Multiple camera & camera switching
 * @todo Mobile controls
 */
export const
	ctx = canvas.getContext("2d"),
	meshes = new Set(),
	rotateCamera = e => {
		cameraX += e.movementX / SCREEN.WIDTH;
		cameraY -= e.movementY / SCREEN.HEIGHT;		

		camera.rotate(cameraY, cameraX, 0);
	},
	pointerLockUpdate = () => {
		if (
			canvas === document.pointerLockElement ||
			canvas === document.mozPointerLockElement
		) {
			addEventListener("mousemove", rotateCamera);
			addEventListener("keydown", pressKeys);
			addEventListener("keyup", releaseKeys);
		} else {
			removeEventListener("mousemove", rotateCamera);
			removeEventListener("keydown", pressKeys);
			removeEventListener("keyup", releaseKeys);
		}
	};
let cameraX, cameraY;

// Stretch the canvas to the screen size
canvas.width = SCREEN.MAX_WIDTH;
canvas.height = SCREEN.MAX_HEIGHT;

ctx.strokeStyle = "#fef953";

init();

cameraX = camera.rotation[0];
cameraY = camera.rotation[1];

loop();

addEventListener("resize", resize);
addEventListener("pointerlockchange", pointerLockUpdate);
addEventListener("mozpointerlockchange", pointerLockUpdate);

// Pointer lock request event
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.addEventListener("click", function() {
	this.requestPointerLock();
});
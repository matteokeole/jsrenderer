import {Viewport, FRAMES_PER_SECOND, FRAMERATE, SENSITIVITY as S} from "./vars.js";
import {default as init} from "./init.js";
import loop from "./loop.js";
import resize from "./resize.js";
import {pressKeys, releaseKeys} from "./input-handler.js";
import {currentCamera} from "./PerspectiveCamera.js";

/**
 * Vanilla JavaScript 3D rendering engine.
 * 
 * Controls:
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Ascend
 * [LeftCtrl]	Descend
 * [F1]			Change camera
 * 
 * @version 0.0.1
 * 
 * @see {link https://github.com/matteokeole/3DJSEngine}
 * @see {link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory}
 * @see {link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {link https://www.sitepoint.com/building-3d-engine-javascript/}
 * @see {link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * @see {link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 * 
 * @todo Clipping
 * @todo Z-Buffer
 * @todo Fix meshes attached to cameras
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
		camIndex + 1 >= cameras.size ?
			camIndex = 0 :
			camIndex++;

		[...cameras][camIndex].setCurrent();
	},
	rotateCamera = e => {
		let x = (-e.movementY * S) / Viewport.height, // Rotation along the X axis
			y = (e.movementX * S) / Viewport.width; // Rotation along the Y axis

		// Prevent < -180° and > 180° rotation along the X axis
		if (
			x < 0 && currentCamera.rotation[0] < -Math.PI / 2 || // To the top
			x > 0 && currentCamera.rotation[0] > Math.PI / 2 // To the bottom
		) x = 0;

		// Prevent "infinite" rotation along the Y axis
		if (Math.abs(currentCamera.rotation[1]) > Math.PI * 2) currentCamera.rotation[1] = 0;

		currentCamera.addRotation(x, y, 0);
	};

// Stretch the canvas to the viewport size
canvas.width = Viewport.maxWidth;
canvas.height = Viewport.maxHeight;

ctx.strokeStyle = "#fef953";

init();

// Get the current camera index after the initialization
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

debugFPS.innerText = `${FRAMES_PER_SECOND} fps, ${FRAMERATE} rate`;
import {SCREEN} from "./vars.js";
import {camera, default as init} from "./init.js";
import loop from "./loop.js";
import resize from "./resize.js";
import {pressKeys, releaseKeys} from "./input-handler.js";

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

cameraX = camera.rotation[0],
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
import {SCREEN} from "./vars.js";
import {camera, default as init} from "./init.js";
import loop from "./loop.js";
import {resize} from "./resize.js";
import {key_press, key_release} from "./input-handler.js";

export const
	ctx = canvas.getContext("2d"),
	meshes = new Set(),
	rotateCamera = e => {
		cameraX += e.movementX;

		// if (camera.rotation[1] <= Math.PI / 2) {
			cameraY += e.movementY;
		// }

		camera.rotate(cameraX / SCREEN.WIDTH, cameraY / SCREEN.HEIGHT, 0);
	},
	pointerLockChange = () => {
		document.pointerLockElement === canvas || document.mozPointerLockElement === canvas ?
			addEventListener("mousemove", rotateCamera) :
			removeEventListener("mousemove", rotateCamera);
	};

// Stretch the canvas to the screen size
canvas.width = SCREEN.MAX_WIDTH;
canvas.height = SCREEN.MAX_HEIGHT;

ctx.strokeStyle = "#fef953";

init();

let cameraX = camera.rotation[0],
	cameraY = camera.rotation[1];

loop();

addEventListener("resize", resize);
addEventListener("keydown", key_press);
addEventListener("keyup", key_release);

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.addEventListener("click", function() {
	this.requestPointerLock();
});
addEventListener("pointerlockchange", pointerLockChange);
addEventListener("mozpointerlockchange", pointerLockChange);
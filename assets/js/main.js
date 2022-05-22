import {SCREEN} from "./vars.js";
import init from "./init.js";
import loop from "./loop.js";
import {resize} from "./resize.js";
import {key_press, key_release} from "./input-handler.js";
import Camera from "./Camera.js";

export const
	ctx = canvas.getContext("2d"),
	meshes = new Set(),
	camera = new Camera(),
	rotate = e => {
		pointerX += e.movementX;
		pointerY += e.movementY;

		camera.rotate(
			pointerX / SCREEN.WIDTH,
			pointerY / SCREEN.HEIGHT,
			0,
		);
	},
	pointerLockChange = () => {
		document.pointerLockElement === canvas || document.mozPointerLockElement === canvas ?
			addEventListener("mousemove", rotate) :
			removeEventListener("mousemove", rotate);
	};
let pointerX = 0,
	pointerY = 0;

camera.place(0, 0, 0); // todo: Invert Y and Z

// Stretch the canvas to the screen size
canvas.width = SCREEN.MAX_WIDTH;
canvas.height = SCREEN.MAX_HEIGHT;

ctx.strokeStyle = "#fef953";

init();
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
import {SCREEN} from "./vars.js";
import init from "./init.js";
import loop from "./loop.js";
import {resize} from "./resize.js";
import {key_down, key_up} from "./input-handler.js";
import Camera from "./Camera.js";

export const
	ctx = canvas.getContext("2d"),
	meshes = new Set(),
	camera = new Camera(),
	rotate = e => {
		x += e.movementX;
		y += e.movementY;
		camera.rotate(x / SCREEN.WIDTH, 0, 0);
	},
	pointerLockChange = () => {
		if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
			addEventListener("mousemove", rotate);
		} else {
			removeEventListener("mousemove", rotate);
		}
	};
let x = 0, y = 0;

camera.position.set(0, 0, 0); // todo: Invert Y and Z

// Stretch the canvas to the screen size
canvas.width = SCREEN.MAX_WIDTH;
canvas.height = SCREEN.MAX_HEIGHT;

ctx.strokeStyle = "#fef953";

init();
loop();

addEventListener("resize", resize);
addEventListener("keydown", key_down);
addEventListener("keyup", key_up);

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.addEventListener("click", function() {
	this.requestPointerLock();
});
addEventListener("pointerlockchange", pointerLockChange);
addEventListener("mozpointerlockchange", pointerLockChange);
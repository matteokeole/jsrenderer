import {SENSITIVITY} from "./config.js";
import {Renderer} from "./class/Renderer.js";
import {Scene} from "./class/Scene.js";
import {Camera} from "./class/Camera.js";
import {BoxGeometry} from "./class/BoxGeometry.js";
import {Mesh} from "./class/Mesh.js";
import {Vector3} from "./class/Vector3.js";
import "./events.js";
import loop from "./loop.js";

/**
 * Vanilla JavaScript 3D rendering engine, inspired by THREE.js.
 * 
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Ascend
 * [LeftCtrl]	Descend
 * 
 * @see {link https://github.com/matteokeole/3DJSEngine}
 * @see {link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory}
 * @see {link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {link https://www.sitepoint.com/building-3d-engine-javascript}
 * @see {link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * @see {link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 */
export const
	lookAround = e => {
		let x = -e.movementY * SENSITIVITY / renderer.height, // Rotation along the X axis
			y = e.movementX * SENSITIVITY / renderer.width; // Rotation along the Y axis

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && camera.rotation.x < -Math.PI / 2 || // To the top
			x > 0 && camera.rotation.x > Math.PI / 2 // To the bottom
		) x = 0;

		// Prevent unlimited rotation along the Y axis
		if (Math.abs(camera.rotationy) > Math.PI * 2) camera.rotation.y = 0;

		camera.rotation.x += x;
		camera.rotation.y += y;
		// camera.rotation.z = e.movementX * Math.PI / 360;
	},
	keys = new Set(),
	pressKeys = e => keys.add(e.code),
	releaseKeys = e => keys.delete(e.code);

export const
	renderer = new Renderer(),
	scene = new Scene(),
	camera = new Camera(800);

renderer.ctx.strokeStyle = "#fef953";

camera.position.set(0, 0, 0);

let box = new BoxGeometry(2, 2, 2);
let mesh = new Mesh(box);
mesh.position.set(0, 0, 5);
mesh.scale.set(2, 1, 1);
scene.add(mesh);

loop();
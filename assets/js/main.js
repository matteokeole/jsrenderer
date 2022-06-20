import {VELOCITY, SENSITIVITY} from "./config.js";
import {Renderer} from "./class/Renderer.js";
import {Scene} from "./class/Scene.js";
import {Camera} from "./class/Camera.js";
import {BoxGeometry} from "./class/BoxGeometry.js";
import {PlaneGeometry} from "./class/PlaneGeometry.js";
import {Mesh} from "./class/Mesh.js";
import "./events.js";
import loop from "./loop.js";

/**
 * Vanilla JavaScript 3D rendering engine, inspired by three.js.
 * 
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Fly up
 * [LeftCtrl]	Fly down
 * 
 * @see {link https://github.com/matteokeole/jsrenderer}
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
		// camera.rotation.z = e.movementX * Math.PI / 1500;
	},
	keys = new Set(),
	pressKeys = e => keys.add(e.code),
	releaseKeys = e => keys.delete(e.code),
	renderer = new Renderer(),
	scene = new Scene(),
	camera = new Camera(800);
export let base, mesh, rotatedCube, mesh2, mesh3, mesh4;

scene.background = "#151515";

base = new Mesh(new PlaneGeometry(10, 6));
base.position.set(0, -1, 5);

mesh = new Mesh(new BoxGeometry(2, 2, 2));
mesh.position.set(2.5, 0, 6);
mesh.rotation.y = Math.PI / 5;

rotatedCube = mesh.clone();
rotatedCube.scale.set(.5, .5, .5);

mesh2 = new Mesh(new BoxGeometry(.7, 3, .7));
mesh2.position.set(-2, .5, 3.5);
mesh2.rotation.y = Math.PI / 3;

mesh3 = new Mesh(new BoxGeometry(.4, 2.5, .4));
mesh3.position.set(-2.66, .25, 3.1);
mesh3.rotation.y = Math.PI / 4;
mesh3.rotation.z = Math.PI / 19;

mesh4 = new Mesh(new BoxGeometry(3, .4, 1.2));
mesh4.position.set(-1.5, -.8, 6);
mesh4.rotation.y = -Math.PI / 7;

scene.add(base, mesh, rotatedCube, mesh2, mesh3, mesh4);

loop();
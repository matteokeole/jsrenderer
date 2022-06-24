import * as Module from "../src/module.js";
import "./events.js";
import loop from "./loop.js";

export const
	keys = new Set(),
	pressKeys = e => {
		e.preventDefault();
		keys.add(e.code);
	},
	releaseKeys = e => {
		e.preventDefault();
		keys.delete(e.code);
	},
	renderer = new Module.Renderer(),
	scene = new Module.Scene(),
	camera = new Module.Camera(62, renderer.width / renderer.height, .1, 3000);

scene.background = new Module.Color(0x151515);

await renderer.loadProgram("assets/shaders");
renderer.primitiveType = renderer.gl.TRIANGLES;

fov.value = camera.fov;
fov.nextElementSibling.textContent = camera.fov;



let plane1 = new Module.Mesh(
	new Module.PlaneGeometry(10, 6),
	new Module.Color(0xfaa953),
);
plane1.position.set(0, -1, 5);



let cube1 = new Module.Mesh(
	new Module.BoxGeometry(2),
	new Module.Color(0xffffff),
);
cube1.position.set(0, 0, 4);
cube1.position.set(2.5, 0, 6);
cube1.rotation.y = Math.PI / 5;



let animatedCube = cube1.clone();
animatedCube.position.set(0, 0, 5);
animatedCube.scale = animatedCube.scale.divideScalar(2);



let pillar1 = new Module.Mesh(
	new Module.BoxGeometry(.7, 3, .7),
	new Module.Color(0xde1818),
);
pillar1.position.set(-2, .5, 3.5);
pillar1.rotation.y = Math.PI / 3;



let pillar2 = new Module.Mesh(
	new Module.BoxGeometry(.4, 2.5, .4),
	new Module.Color(0x222),
);
pillar2.position.set(-2.66, .25, 3.1);
pillar2.rotation.y = Math.PI / 4;
pillar2.rotation.z = Math.PI / 19;



let plate1 = new Module.Mesh(
	new Module.BoxGeometry(3, .4, 1.2),
	new Module.Color(0xfff),
);
plate1.position.set(-1.5, -.8, 6);
plate1.rotation.y = -Math.PI / 7;



scene.add(plane1, cube1, animatedCube, pillar1, pillar2, plate1);

loop();
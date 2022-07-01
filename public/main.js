import * as Module from "../src/module.js";
import "./events.js";
import loop from "./loop.js";
import {setGUIScene} from "./gui/main.js";

/**
 * Vanilla JavaScript 3D rendering engine, made with WebGL 2 and inspired by three.js.
 * 
 * Controls:
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Fly up
 * [LeftCtrl]	Fly down
 * 
 * @see {link https://github.com/matteokeole/jsrenderer/tree/webgl}
 * @see {link https://www.youtube.com/watch?v=lCSNhq1oAFo&t=51s}
 * @see {link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web}
 * @see {link https://www.sitepoint.com/building-3d-engine-javascript}
 * @see {link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 * @see {link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 */
export let
	renderer = new Module.Renderer(render.offsetWidth, render.offsetHeight, {
		CULL_FACE: true,
		DEPTH_TEST: true,
	}),
	scene = new Module.Scene(),
	camera = new Module.Camera(90, 1, .1, 3000),
	floor, ceiling, wall, player;

// Load shader program in the renderer
await renderer.loadProgram("assets/shaders");
render.appendChild(renderer.canvas);

scene.background = new Module.Color(0x3d3d3d);

camera.aspect = render.offsetWidth / render.offsetHeight;
camera.updateProjectionMatrix();
camera.position.y = 2.003;
// camera.position.set(1.13, 2.003, 1.625);


floor = new Module.Mesh(
	new Module.PlaneGeometry(8, 4),
	new Module.Material({texture: new Module.Texture("assets/textures/tilefloor018a.jpg")}),
);
floor.position.set(2, 0, 0);
floor.geometry.uvs = new Float32Array([
	1.35, 0, 1.35,
	2.7, 0, 2.7,
]);


wall = new Module.Mesh(
	new Module.PlaneGeometry(4, 8),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall.position.set(2, 2, 2);
wall.rotation.set(0, Math.PI / 2, Math.PI / 2);
wall.geometry.uvs = new Float32Array([
	2, 0, 2,
	1, 0, 1,
]);


player = new Module.Mesh(
	new Module.BoxGeometry(.75, 2.003, .75),
	new Module.Material({color: 0x000000}),
);
player.position.set(0, 2.003 / 2, 0);
camera.attach(player)


scene.add(camera, floor, wall, player);

// setGUIScene(scene);

loop();
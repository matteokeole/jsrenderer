import * as Module from "../src/module.js";
import "./events.js";
import loop from "./loop.js";
// import {setGUIScene} from "./gui/main.js";

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
	floor, ceiling, wall1, wall2, wall3, wall4;

// Load shader program in the renderer
await renderer.loadProgram("assets/shaders");
render.appendChild(renderer.canvas);

scene.background = new Module.Color(0x3d3d3d);

camera.aspect = render.offsetWidth / render.offsetHeight;
camera.updateProjectionMatrix();
camera.position.set(0, 2, 0);



floor = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/woodfloor007a.jpg")}),
);
floor.rotation.y = Math.PI / 2;


wall1 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall1.position.set(-2, 2, 0);
wall1.rotation.z = Math.PI / 2;


wall3 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall3.position.set(2, 2, 0);
wall3.rotation.set(Math.PI, 0, -Math.PI / 2);


scene.add(camera, floor, wall1, wall3);

// setGUIScene(scene);

loop();
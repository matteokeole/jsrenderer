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
		CULL_FACE: false,
		DEPTH_TEST: true,
	}),
	scene = new Module.Scene(),
	camera = new Module.Camera(90, 1, .1, 3000),
	floor, ceiling, wall1, wall2, wall3, wall4, cube1, pillar1, pillar2, plate1, ambientLight, directionalLight, attachedCube;

// Load shader program in the renderer
await renderer.loadProgram("assets/shaders");
render.appendChild(renderer.canvas);

scene.background = new Module.Color(0x3d3d3d);

camera.aspect = render.offsetWidth / render.offsetHeight;
camera.updateProjectionMatrix();
camera.position.set(-1.1, 1, 1.624);



floor = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/woodfloor007a.jpg")}),
);
floor.position.set(0, -1, 0);
floor.rotation.y = Math.PI / 2;


ceiling = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/woodfloor007a.jpg")}),
);
ceiling.position.set(0, 3, 0);
ceiling.rotation.y = Math.PI / 2;


wall1 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall1.position.set(-2, 1, 0);
wall1.rotation.z = Math.PI / 2;


wall2 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall2.position.set(0, 1, 2);
wall2.rotation.set(-Math.PI / 2, Math.PI / 2, 0);


wall3 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall3.position.set(2, 1, 0);
wall3.rotation.z = Math.PI / 2;


wall4 = new Module.Mesh(
	new Module.PlaneGeometry(4),
	new Module.Material({texture: new Module.Texture("assets/textures/plasterwall030c.jpg")}),
);
wall4.position.set(0, 1, -2);
wall4.rotation.set(-Math.PI / 2, Math.PI / 2, 0);


/*cube1 = new Module.Mesh(
	new Module.BoxGeometry(2),
	new Module.Material({color: new Module.Color(0xffffff)}),
);
cube1.position.set(0, 0, 4);
cube1.position.set(2.5, 0, 6);
cube1.rotation.y = Math.PI / 5;


pillar1 = new Module.Mesh(
	new Module.BoxGeometry(.7, 3, .7),
	new Module.Material({color: new Module.Color(0xde1818)}),
);
pillar1.position.set(-2, .5, 3.5);
pillar1.rotation.y = Math.PI / 3;


pillar2 = new Module.Mesh(
	new Module.BoxGeometry(.4, 2.5, .4),
	new Module.Material({color: new Module.Color(0x222)}),
);
pillar2.position.set(-2.66, .25, 3.1);
pillar2.rotation.y = Math.PI / 4;
pillar2.rotation.z = Math.PI / 19;


plate1 = new Module.Mesh(
	new Module.BoxGeometry(3, .4, 1.2),
	new Module.Material({color: new Module.Color(0xfff)}),
);
plate1.position.set(-1.5, -.8, 6);
plate1.rotation.y = -Math.PI / 7;


attachedCube = new Module.Mesh(
	new Module.BoxGeometry(.3),
	new Module.Material({color: new Module.Color(0xff9800)}),
);

ambientLight = new Module.AmbientLight(1);

directionalLight = new Module.DirectionalLight();
directionalLight.direction.set(0, 1, -1);*/



// scene.add(ambientLight, directionalLight, floor, cube1, pillar1, pillar2, plate1);
scene.add(camera, floor, ceiling, wall1, wall2, wall3, wall4);

// setGUIScene(scene);

loop();
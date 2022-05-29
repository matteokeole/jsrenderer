import PerspectiveCamera from "./PerspectiveCamera.js";
import * as Geometry from "./Geometry.js";
import Mesh from "./Mesh.js";

export default () => {
	let camera = new PerspectiveCamera(400, 1, 1);

	let slab = new Mesh(new Geometry.Box(1.5, .5, 1.5));
	slab.place(0, -1, 4);
};
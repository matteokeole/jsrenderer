import PerspectiveCamera from "./PerspectiveCamera.js";
import * as Geometry from "./Geometry.js";
import Mesh from "./Mesh.js";

export default async () => {
	let camera = new PerspectiveCamera(800, 1, 1);

	let slab = new Mesh(new Geometry.Box(2, 2, 2));
	slab.place(0, 2, 5);

	await slab.applyTexture("model.jpg");
};
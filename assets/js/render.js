import {meshes} from "./main.js";
import {project, bfc} from "./magic.js";
import {SCREEN} from "./vars.js";

export default (canvas, camera) => {
	let ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	for (let mesh of meshes) {
		// Loop through the mesh index buffer and draw the associated polygon
		for (let polygon of mesh.indexBuffer) {
			// Project each polygon vector
			let points = [
					project(mesh.vertexBuffer[polygon[0]], mesh, camera),
					project(mesh.vertexBuffer[polygon[1]], mesh, camera),
					project(mesh.vertexBuffer[polygon[2]], mesh, camera),
				],
				culling = bfc(...points);

			if (culling) {
				ctx.beginPath();
				ctx.moveTo(...points[0]);
				ctx.lineTo(...points[1]);
				ctx.lineTo(...points[2]);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
};
import {meshes} from "./main.js";
import {project, get_culling} from "./magic.js";
import {SCREEN} from "./vars.js";

export default (canvas, camera) => {
	let ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	for (let mesh of meshes) {
		// Loop through the mesh index buffer and draw the associated polygon
		for (let polygon of mesh.indexBuffer) {
			// Project each polygon vertex
			let vertices = polygon.map(v => project(mesh.vertexBuffer[v], mesh, camera)),
				culling = get_culling(...vertices); // Back-face culling checking before drawing

			if (culling > 0) {
				ctx.beginPath();
				ctx.moveTo(...vertices[0]);
				ctx.lineTo(...vertices[1]);
				ctx.lineTo(...vertices[2]);
				ctx.closePath(); // Return to the polygon first vertex
				ctx.stroke();
			}
		}
	}
};
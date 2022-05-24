import {ctx, meshes} from "./main.js";
import {convert} from "./magic.js";
import get_culling from "./culling.js";

export default () => {
	// Render meshes
	for (let mesh of meshes) {
		for (let polygon of mesh.polygons) {
			const
				p0		= convert(mesh, mesh.vertices[polygon[0]]),
				p1		= convert(mesh, mesh.vertices[polygon[1]]),
				p2		= convert(mesh, mesh.vertices[polygon[2]]),
				culling	= get_culling(p0, p1, p2);

			if (polygon[3]) ctx.fillStyle = polygon[3];

			// Back-face culling checking before drawing
			if (culling > 0) {
				ctx.beginPath();
				ctx.moveTo(...p0);
				ctx.lineTo(...p1);
				ctx.lineTo(...p2);
				ctx.closePath();
				polygon[3] && ctx.fill();
				ctx.stroke();
			}
		}
	}
};
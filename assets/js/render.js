import {ctx, meshes} from "./main.js";
import {convert} from "./magic.js";
import get_culling from "./culling.js";

export default () => {
	// Render meshes
	for (let mesh of meshes) {
		for (let triangle of mesh.triangles) {
			const
				p0		= convert(mesh, mesh.vertices[triangle[0]]),
				p1		= convert(mesh, mesh.vertices[triangle[1]]),
				p2		= convert(mesh, mesh.vertices[triangle[2]]),
				culling	= get_culling(p0, p1, p2);

			if (triangle[3]) ctx.fillStyle = triangle[3];

			// Back-face culling checking before drawing
			if (culling > 0) {
				ctx.beginPath();
				ctx.moveTo(...p0);
				ctx.lineTo(...p1);
				ctx.lineTo(...p2);
				ctx.closePath();
				triangle[3] && ctx.fill();
				ctx.stroke();
			}
		}
	}
};
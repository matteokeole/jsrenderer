import {camera} from "./init.js";
import project from "./project.js";

export const
	/**
	 * Convert 3-dimensional vertices to 2-dimensional ones.
	 * Return the projection of the new vertices.
	 * 
	 * @todo	The object rotation must be done from the camera coordinates, not the map origin.
	 */
	convert3d = (mesh, vertices) => {
		const
			// Create rotation vectors with the given vertices
			// rv0 = rotate2d(vertices[0], vertices[2], mesh.rotation[0]),
			// rv1 = rotate2d(vertices[1], rv0[1], mesh.rotation[1]),
			rv0 = rotate2d(
				vertices[0],
				vertices[2],
				mesh.rotation[0] + camera.rotation[0],
			),
			rv1 = rotate2d(
				vertices[1],
				rv0[1],
				mesh.rotation[1] - camera.rotation[1],
			),
			// Sum the obtained vector with the camera position to enable moving along the Z-axis
			nv = [rv0[0], rv1[0], rv1[1]].map((p, i) => p - camera.position[i]);

		// Return the projection of the new vector
		return project(nv);
	},
	rotate2d = (x, z, rad) => {
		const
			cos = Math.cos(rad),
			sin = Math.sin(rad);

		return [
			(x * cos) - (z * sin),
			(x * sin) + (z * cos),
		];
	},
	facing_side = (p0, p1, p2) =>
		(p1[0] - p0[0]) * (p2[1] - p0[1]) -
		(p2[0] - p0[0]) * (p1[1] - p0[1]);
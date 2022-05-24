import {camera} from "./init.js";
import project from "./project.js";

export const
	/**
	 * Converts 3-dimensional vertices to 2-dimensional ones.
	 * Return the projection of the new vertices.
	 */
	convert = (mesh, vertice) => {
		const
			rv0 = rotate2d(
				vertice[0] - camera.position[0],
				vertice[2] - camera.position[2],
				mesh.rotation[0] + camera.rotation[1],
			),
			rv1 = rotate2d(
				vertice[1] - camera.position[1],
				rv0[1],
				mesh.rotation[1] - camera.rotation[0],
			),
			nv = [rv0[0], rv1[0], rv1[1]];

		return project(nv);
	},
	/**
	 * Applies a 2-dimensional rotation on a vector.
	 * @param	{number}	x		X coordinate
	 * @param	{number}	z		Z or Y coordinate
	 * @param	{number}	angle	Rotation factor, in radians
	 */
	rotate2d = (x, z, angle) => {
		const
			cos = Math.cos(angle),
			sin = Math.sin(angle);

		return [
			x * cos - z * sin,
			x * sin + z * cos,
		];
	};
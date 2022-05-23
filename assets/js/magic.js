import {camera} from "./init.js";
import project from "./project.js";

export const
	/**
	 * Converts 3-dimensional vertices to 2-dimensional ones.
	 * Return the projection of the new vertices.
	 * @todo The object rotation must be done from the camera coordinates and not the map origin
	 */
	convert = (mesh, vertice) => {
		const
			rv0 = rotate2d(mesh, vertice[0], vertice[2], mesh.rotation[0] + camera.rotation[0]),
			rv1 = rotate2d(mesh, vertice[1], rv0[1], mesh.rotation[1] + camera.rotation[1]),
			nv = [
				rv0[0] - camera.position[0],
				rv1[0] - camera.position[1],
				rv1[1] - camera.position[2],
			];

		return project(nv);
	},
	/**
	 * Applies a 2-dimensional rotation on a vector.
	 * @param	{number}	x	X coordinate
	 * @param	{number}	z	Z or Y coordinate
	 * @param	{number}	rad	Rotation factor, in radians
	 */
	rotate2d = (mesh, x, z, rad) => {
		const
			cos = Math.cos(rad),
			sin = Math.sin(rad);

		return [
			x * cos - z * sin,
			x * sin + z * cos,
		];
	};
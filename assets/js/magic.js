import {SCREEN, FIELD_OF_VIEW} from "./vars.js";
import Vertex from "./Vertex.js";

export const
	/**
	 * Converts 3-dimensional vertex to 2-dimensional ones.
	 * Return the projection of the new vertex.
	 */
	project = (vertex, parentMesh, currentCamera) => {
		let attachedCamera = parentMesh.attachedCamera,
			v = vertex,
			r = parentMesh.rotation;

		if (attachedCamera) {
			v = new Vertex(
				v.x + attachedCamera.position.x,
				v.y - attachedCamera.position.y,
				v.z + attachedCamera.position.z,
			);
			r = [
				parentMesh.rotation[0] - attachedCamera.rotation[1],
				parentMesh.rotation[1] + attachedCamera.rotation[0],
				parentMesh.rotation[2] - attachedCamera.rotation[2],
			];
		}

		let
			rv0 = rotate2d(
				v.x - currentCamera.position.x,
				v.z - currentCamera.position.z,
				r[0] + currentCamera.rotation[1],
			),
			rv1 = rotate2d(
				(v.y - parentMesh.position.y * 2) + currentCamera.position.y,
				rv0[1],
				r[1] - currentCamera.rotation[0],
			),
			newV = new Vertex(rv0[0], ...rv1);

		return projectPoint(newV);
	},
	/**
	 * Return in a 2-dimensional vertex the projection of the given 3-dimensional vertex.
	 * X' = X / Z
	 * Y' = Y / Z
	 * @param	{Vertex}	v	Vertex to project
	 */
	projectPoint = v => [
		(v.x / v.z) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.WIDTH2,
		(v.y / v.z) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.HEIGHT2,
	],
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
	},
	/**
	 * Basic back-face culling implementation.
	 * If the return is negative or null, the face won't be drawn.
	 * 
	 * @param	{array}	p0	First point coordinates
	 * @param	{array}	p1	Second point coordinates
	 * @param	{array}	p2	Third point coordinates
	 * 
	 * @returns {array}
	 */
	get_culling = (p0, p1, p2) =>
		(p1[0] - p0[0]) * (p2[1] - p0[1]) -
		(p2[0] - p0[0]) * (p1[1] - p0[1]);
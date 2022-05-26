import {SCREEN, PERSPECTIVE as P} from "./vars.js";
import Vector3 from "./Vector3.js";

export const
	/**
	 * Converts 3-dimensional vector to 2-dimensional ones.
	 * Return the projection of the new vector.
	 */
	project = (vector, parentMesh, currentCamera) => {
		let attachedCamera = parentMesh.attachedCamera,
			v = vector,
			r = parentMesh.rotation;

		if (attachedCamera) {
			v = new Vector3(
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
			newV = new Vector3(rv0[0], ...rv1);

		return convert2d(newV);
	},
	/**
	 * Return in a 2-dimensional vector the projection of the given 3-dimensional vector.
	 * X' = X / Z
	 * Y' = Y / Z
	 * @param	{Vector3}	v	Vector to project
	 */
	convert2d = v => [
		v.x * (P / v.z) + SCREEN.WIDTH2,
		v.y * (P / v.z) + SCREEN.HEIGHT2,
	],
	/**
	 * Applies a 2-dimensional rotation on a vector.
	 * @param	{number}	x	X coordinate
	 * @param	{number}	z	Z or Y coordinate
	 * @param	{number}	a	Rotation angle, in radians
	 */
	rotate2d = (x, z, a) => {
		const
			cos = Math.cos(a),
			sin = Math.sin(a);

		return [
			x * cos - z * sin,
			x * sin + z * cos,
		];
	},
	/**
	 * Basic back-face culling implementation using cross-product.
	 * If the return is negative or null, the face won't be drawn.
	 * 
	 * @param	{array}	v0	First point coordinates
	 * @param	{array}	v1	Second point coordinates
	 * @param	{array}	v2	Third point coordinates
	 * 
	 * @returns {boolean}
	 */
	bfc = (v0, v1, v2) => (v1[0] - v0[0]) * (v2[1] - v0[1]) - (v2[0] - v0[0]) * (v1[1] - v0[1]) > 0;
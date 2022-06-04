import {Viewport} from "./vars.js";
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
			r = new Vector3(
				parentMesh.rotation.x - attachedCamera.rotation[1],
				parentMesh.rotation.y + attachedCamera.rotation[0],
				parentMesh.rotation.z - attachedCamera.rotation[2],
			);
		}

		let
			rv0 = rotate2d(
				v.x - currentCamera.position.x,
				v.z - currentCamera.position.z,
				r.x + currentCamera.rotation[1],
			),
			rv1 = rotate2d(
				(v.y - parentMesh.position.y * 2) + currentCamera.position.y,
				rv0[1],
				r.y - currentCamera.rotation[0],
			),
			newV = new Vector3(rv0[0], ...rv1);

		return convert2d(newV, currentCamera);
	},
	/**
	 * Return in a 2-dimensional vector the projection of the given 3-dimensional vector.
	 * X' = X / Z
	 * Y' = Y / Z
	 * 
	 * @param	{Vector3}	v	Vector to project
	 */
	convert2d = (v, camera) => [
		Math.floor(v.x * (camera.P / v.z) + Viewport.midWidth),
		Math.floor(v.y * (camera.P / v.z) + Viewport.midHeight),
	],
	/**
	 * Applies a 2-dimensional rotation on a vector.
	 * 
	 * @param	{number}	x	X coordinate
	 * @param	{number}	z	Y/Z coordinate
	 * @param	{number}	a	Rotation angle (in radians)
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
	 * @param	{array}	v0
	 * @param	{array}	v1
	 * @param	{array}	v2
	 * @returns	{boolean}
	 */
	bfc = (v0, v1, v2) => (v1[0] - v0[0]) * (v2[1] - v0[1]) - (v2[0] - v0[0]) * (v1[1] - v0[1]) > 0;
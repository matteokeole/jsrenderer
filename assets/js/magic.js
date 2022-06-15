import {Viewport} from "./vars.js";
import {Vector3} from "./Vector3.js";

export const
	/**
	 * Converts 3-dimensional vector to 2-dimensional ones.
	 * Return the projection of the new vector.
	 */
	project = (vector, mesh, currentCamera) => {
		let v = vector,
			r = mesh.rotation;
		/*let attachedCamera = mesh.attachedCamera;

		if (attachedCamera) {
			v = new Vector3(
				v.x + attachedCamera.position.x,
				v.y - attachedCamera.position.y,
				v.z + attachedCamera.position.z,
			);
			r = new Vector3(
				mesh.rotation.x - attachedCamera.rotation.y,
				mesh.rotation.y + attachedCamera.rotation.x,
				mesh.rotation.z - attachedCamera.rotation.z,
			);
		}*/

		let rv0 = rotate2d(
				v.x - currentCamera.position.x,
				v.z - currentCamera.position.z,
				currentCamera.rotation.y,
			),
			rv1 = rotate2d(
				currentCamera.position.y + (v.y - mesh.position.y * 2),
				rv0[1],
				r.y + currentCamera.rotation.x,
			);

		v = new Vector3(rv0[0], ...rv1);

		return convert2d(v, currentCamera);
	},
	/**
	 * Applies a 2-dimensional rotation on a vector.
	 * 
	 * @param	{number}	x
	 * @param	{number}	y
	 * @param	{number}	rad
	 * @returns	{array}
	 */
	rotate2d = (x, y, rad) => {
		let c = Math.cos(rad),
			s = Math.sin(rad);

		return [
			x * c - y * s,
			x * s + y * c,
		];
	},
	/**
	 * Returns in a 2-dimensional vector the projection of the given 3-dimensional vector.
	 * 
	 * @param	{Vector3}	v
	 * @returns	{array}
	 */
	convert2d = (v, camera) => [
		Math.floor(v.x * (camera.P / v.z) + Viewport.midWidth),
		Math.floor(v.y * (camera.P / v.z) + Viewport.midHeight),
	],
	/**
	 * Basic back-face culling implementation using cross-product.
	 * If the result is negative or null, the face won't be drawn.
	 * 
	 * @param	{array}	v0
	 * @param	{array}	v1
	 * @param	{array}	v2
	 * @returns	{boolean}
	 */
	bfc = (v0, v1, v2) => (v1[0] - v0[0]) * (v2[1] - v0[1]) - (v2[0] - v0[0]) * (v1[1] - v0[1]) > 0;
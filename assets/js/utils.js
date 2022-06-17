import {Vector3} from "./class/Vector3.js";

export const
	transform = (v, mesh, camera) => {
		v = v.add(mesh.position); // Translate from mesh origin
		v = v.add(camera.position.invert()); // Translate from camera
		v = rotateY(v, camera.rotation.y); // Rotate along the Y axis
		v = rotateX(v, -camera.rotation.x); // Rotate along the X axis
		v = rotateZ(v, camera.rotation.z); // Rotate along the Z axis

		return v;
	},
	rotateX = (v, a) => {
		let c = Math.cos(a),
			s = Math.sin(a);

		v.y *= -1; // Invert 

		return new Vector3(
			v.x,
			v.y * c - v.z * s,
			v.y * s + v.z * c,
		);
	},
	rotateY = (v, a) => {
		let c = Math.cos(a),
			s = Math.sin(a);

		return new Vector3(
			v.x * c - v.z * s,
			v.y,
			v.x * s + v.z * c,
		);
	},
	rotateZ = (v, a) => {
		let c = Math.cos(a),
			s = Math.sin(a);

		return new Vector3(
			v.x * c - v.y * s,
			v.x * s + v.y * c,
			v.z,
		);
	},
	project = (v, fov) => [
		Math.floor(v.x * fov / v.z),
		Math.floor(v.y * fov / v.z),
	],
	viewport = (p, renderer) => [
		p[0] + renderer.halfWidth,
		p[1] + renderer.halfHeight,
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
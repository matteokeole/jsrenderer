import {SENSITIVITY} from "../../public/config.js";
import {Vector3, Matrix4} from "../module.js";

export const Camera = function(fov = 60, aspect = innerWidth / innerHeight, near = 1, far = 1000) {
	Object.assign(this, {fov, aspect, near, far});

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.distance = new Vector3(); // For third-person view

	this.up = new Vector3(0, 1, 0);
	this.lhcs = new Vector3(-1, -1, 1); // This converts the client left-hand coordinate system to the WebGl right-hand coordinate system
	this.matrix = Matrix4.identity();

	this.lookAround = e => {
		let x = e.movementY * SENSITIVITY / 1000,
			y = e.movementX * SENSITIVITY / 1000;

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && this.rotation.x >= -Math.PI / 2 ||
			x > 0 && this.rotation.x <= Math.PI / 2
		) this.rotation.x += x;

		this.rotation.y += y;
	};

	/**
	 * @todo
	 * @param	{Vector3}	pos
	 * @param	{Vector3}	target
	 * @returns	{Matrix4}
	 */
	this.lookAt = (pos, target) => {
		let axisZ = pos.clone().substract(target).normalize(),
			axisX = this.up.cross(axisZ).normalize(),
			axisY = axisZ.clone().cross(axisX).clone().normalize();

		return new Matrix4([
			axisX.x, axisX.y, axisX.z, 0,
			axisY.x, axisY.y, axisY.z, 0,
			axisZ.x, axisZ.y, axisZ.z, 0,
			pos.x, pos.y, pos.z, 1,
		]);
	};

	this.updateProjectionMatrix();

	return this;
};

Camera.prototype.moveForward = function(n) {
	this.position.x += n * Math.sin(this.rotation.y);
	this.position.z += n * Math.cos(this.rotation.y);
};

Camera.prototype.moveRight = function(n) {
	this.position.x += n * Math.cos(this.rotation.y);
	this.position.z -= n * Math.sin(this.rotation.y);
};

Camera.prototype.updateProjectionMatrix = function() {
	let f = Math.tan(Math.PI * .5 - .5 * this.fov * Math.PI / 180),
		range = 1 / (this.near - this.far);

	this.projectionMatrix = new Matrix4([
		f / this.aspect, 0, 0, 0,
		0, f, 0, 0,
		0, 0, (this.near + this.far) * range, -1,
		0, 0, this.near * this.far * range * 2, 0,
	]);
};
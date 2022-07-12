import {SENSITIVITY} from "../../public/config.js";
import {Vector3, Matrix4} from "../module.js";

export const Camera = function(fov = 60, aspect = innerWidth / innerHeight, near = 1, far = 1000) {
	this.type = "camera";

	Object.assign(this, {fov, aspect, near, far});

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.distance = new Vector3(); // For third-person view

	this.up = new Vector3(0, 1, 0);

	// Convert the client left-hand coordinate system (increase forward, decrease backward)
	// to a valid WebGL right-hand coordinate system (decrease forward, increase backward)
	this.lhcs = new Vector3(-1, -1, 1);

	this.matrix = Matrix4.identity();

	this.lookAround = e => {
		let x = -e.movementY * SENSITIVITY / 1000,
			y = e.movementX * SENSITIVITY / 1000;

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && this.rotation.x >= -Math.PI / 2 ||
			x > 0 && this.rotation.x <= Math.PI / 2
		) this.rotation.x += x;

		this.rotation.y += y;
	};

	this.meshes = new Set();

	this.updateProjectionMatrix();

	return this;
};

Camera.prototype.moveForward = function(n) {
	let direction = new Vector3(
		Math.sin(this.rotation.y),
		0,
		Math.cos(this.rotation.y),
	);

	this.position = this.position.add(direction.multiplyScalar(n));

	for (const mesh of this.meshes) {
		mesh.position.set(this.position);
	}
};

Camera.prototype.moveRight = function(n) {
	let direction = new Vector3(
		Math.cos(this.rotation.y),
		0,
		-Math.sin(this.rotation.y),
	);

	this.position = this.position.add(direction.multiplyScalar(n));

	for (const mesh of this.meshes) {
		mesh.position.set(this.position);
	}
};

Camera.prototype.moveUp = function(n) {
	this.position.y += n;
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

/**
 * @todo
 * @param	{Vector3}	pos
 * @param	{Vector3}	target
 * @returns	{Matrix4}
 */
Camera.prototype.lookAt = function(pos, target) {
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

Camera.prototype.attach = function(...meshes) {
	for (const mesh of meshes) this.meshes.add(mesh);
};

Camera.prototype.detach = function(...meshes) {
	for (const mesh of meshes) this.meshes.delete(mesh);
};
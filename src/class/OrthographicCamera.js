import {SENSITIVITY} from "../../public/config.js";
import {Vector3, Matrix4} from "../module.js";

export const OrthographicCamera = function(width, height, depth) {
	this.width = width;
	this.height = height;
	this.depth = depth;

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.lookAround = e => {
		let x = e.movementY * SENSITIVITY / 1000,
			y = e.movementX * SENSITIVITY / 1000;

		// Prevent < -180° or > 180° rotation along the X axis
		/*if (
			x < 0 && this.rotation.x >= -Math.PI / 2 ||
			x > 0 && this.rotation.x <= Math.PI / 2
		) */this.rotation.x += x;

		this.rotation.y += y;
	};

	this.updateProjectionMatrix();

	return this;
};

OrthographicCamera.prototype.moveForward = function(n) {
	this.position.x += n * Math.sin(this.rotation.y);
	this.position.z += n * Math.cos(this.rotation.y);
};

OrthographicCamera.prototype.moveRight = function(n) {
	this.position.x += n * Math.cos(this.rotation.y);
	this.position.z -= n * Math.sin(this.rotation.y);
};

OrthographicCamera.prototype.updateProjectionMatrix = function() {
	let w2 = 2 / this.width,
		h2 = 2 / this.height,
		d2 = 2 / this.depth;

	this.projectionMatrix = new Matrix4([
		 w2,  0,   0,   0,
		 0,  -h2,  0,   0,
		 0,   0,   d2,  0,
		-1,   1,   0,   1,
	]);
};
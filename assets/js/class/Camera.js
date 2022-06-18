import {Vector3} from "./Vector3.js";

export const Camera = function(fov) {
	this.fov = fov;

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.moveForward = n => {
		this.position.x += n * Math.sin(this.rotation.y);
		this.position.z += n * Math.cos(this.rotation.y);
	};

	this.moveRight = n => {
		this.position.x += n * Math.cos(this.rotation.y);
		this.position.z -= n * Math.sin(this.rotation.y);
	};

	return this;
};
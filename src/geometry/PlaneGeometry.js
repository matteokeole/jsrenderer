import {Vector3} from "../module.js";

export const PlaneGeometry = function(width, height) {
	this.type = "plane";

	this.width = width;
	this.height = height;

	let w2 = this.width / 2,
		h2 = this.height / 2;

	this.vertices = new Float32Array([
		-w2, 0, -h2,
		 w2, 0, -h2,
		 w2, 0,  h2,
		-w2, 0,  h2,
	]);

	this.indices = new Uint16Array([
		0, 2, 1,
		2, 0, 3,
	]);

	return this;
};
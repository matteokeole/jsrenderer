import {Vector3} from "../module.js";

export const PlaneGeometry = function(width = 1, height = width) {
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

	this.normals = new Float32Array([
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	]);

	this.indices = new Uint16Array([
		0, 2, 1,
		2, 0, 3,
	]);

	this.uvs = new Float32Array([
		1, 0, 1,
		1, 0, 1,
	]);

	return this;
};
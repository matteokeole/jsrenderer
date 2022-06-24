import {Vector3} from "../module.js";

export const BoxGeometry = function(width = 1, height = width, depth = width) {
	this.type = "box";

	this.width = width;
	this.height = height;
	this.depth = depth

	let w2 = this.width / 2,
		h2 = this.height / 2,
		d2 = this.depth / 2;

	this.vertices = new Float32Array([
		-w2,  h2,  d2,
		 w2,  h2,  d2,
		 w2, -h2,  d2,
		-w2, -h2,  d2,
		 w2,  h2, -d2,
		-w2,  h2, -d2,
		-w2, -h2, -d2,
		 w2, -h2, -d2,
	]);

	this.indices = new Uint16Array([
		0, 2, 1,
		2, 0, 3,
		4, 6, 5,
		6, 4, 7,
		5, 3, 0,
		3, 5, 6,
		1, 7, 4,
		7, 1, 2,
		5, 1, 4,
		1, 5, 0,
		3, 7, 2,
		7, 3, 6,
	]);

	return this;
};
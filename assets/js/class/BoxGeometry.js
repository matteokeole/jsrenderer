import {Vector3} from "./Vector3.js";

export const BoxGeometry = function(width, height, depth) {
	this.width = width;
	this.height = height;
	this.depth = depth;

	let w2 = this.width / 2,
		h2 = this.height / 2,
		d2 = this.depth / 2;

	this.vertices = [
		new Vector3(-w2,  h2, -d2),
		new Vector3( w2,  h2, -d2),
		new Vector3( w2, -h2, -d2),
		new Vector3(-w2, -h2, -d2),
		new Vector3( w2,  h2,  d2),
		new Vector3(-w2,  h2,  d2),
		new Vector3(-w2, -h2,  d2),
		new Vector3( w2, -h2,  d2),
	];

	this.indices = [
		[0, 1, 3, "red"],
		[3, 1, 2, "red"],
		[4, 5, 7, "red"],
		[7, 5, 6, "red"],
		[5, 0, 6, "green"],
		[6, 0, 3, "green"],
		[1, 4, 2, "green"],
		[2, 4, 7, "green"],
		[5, 4, 0, "blue"],
		[0, 4, 1, "blue"],
		[3, 2, 6, "blue"],
		[6, 2, 7, "blue"],
	];

	return this;
};
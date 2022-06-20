import {Vector3} from "./Vector3.js";

export const BoxGeometry = function(width, height, depth) {
	this.type = "box";

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
		[0, 1, 2],
		[2, 3, 0],
		[4, 5, 6],
		[6, 7, 4],
		[5, 0, 3],
		[3, 6, 5],
		[1, 4, 7],
		[7, 2, 1],
		[5, 4, 1],
		[1, 0, 5],
		[3, 2, 7],
		[7, 6, 3],
	];

	return this;
};
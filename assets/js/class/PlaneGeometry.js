import {Vector3} from "./Vector3.js";

export const PlaneGeometry = function(width, height) {
	this.type = "plane";

	this.width = width;
	this.height = height;

	let w2 = this.width / 2,
		h2 = this.height / 2;

	this.vertices = [
		new Vector3(-w2, 0,  h2),
		new Vector3( w2, 0,  h2),
		new Vector3( w2, 0, -h2),
		new Vector3(-w2, 0, -h2),
	];

	this.indices = [
		[0, 1, 2],
		[2, 3, 0],
	];

	return this;
};
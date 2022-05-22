import {meshes} from "./main.js";

// A mesh is a set of vertices that define a 3D shape
export default function(w, h, d) {
	this.size = [w, h, d];
	this.size2 = this.size.map(s => s / 2);
	// to-do: scale()
	// this.scale = (w, h, d) => {};

	this.position = [0, 0, 0];
	this.place = (x, y, z) => {
		this.position = [x, y, z];

		this.calcVertices();
	};
	this.move = (x, y, z) => {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;

		this.calcVertices();
	};

	this.rotation = [0, 0, 0]; // In radians
	this.rotate = (x, y, z) => this.rotation = [x, y, z];

	this.triangles = [
		[0, 1, 2],
		[2, 1, 3],
		[5, 4, 6],
		[5, 6, 7],
		[3, 5, 7],
		[3, 1, 5],
		[4, 2, 6],
		[0, 2, 4],
		[0, 4, 5],
		[1, 0, 5],
		[2, 3, 6],
		[6, 3, 7],
	];

	this.calcVertices = () => {
		this.vertices = [
			[this.position[0] - this.size2[0], this.position[1] - this.size2[1], this.position[2] - this.size2[2]],
			[this.position[0] + this.size2[0], this.position[1] - this.size2[1], this.position[2] - this.size2[2]],
			[this.position[0] - this.size2[0], this.position[1] + this.size2[1], this.position[2] - this.size2[2]],
			[this.position[0] + this.size2[0], this.position[1] + this.size2[1], this.position[2] - this.size2[2]],
			[this.position[0] - this.size2[0], this.position[1] - this.size2[1], this.position[2] + this.size2[2]],
			[this.position[0] + this.size2[0], this.position[1] - this.size2[1], this.position[2] + this.size2[2]],
			[this.position[0] - this.size2[0], this.position[1] + this.size2[1], this.position[2] + this.size2[2]],
			[this.position[0] + this.size2[0], this.position[1] + this.size2[1], this.position[2] + this.size2[2]],
		];
	};

	meshes.add(this);

	return this;
};
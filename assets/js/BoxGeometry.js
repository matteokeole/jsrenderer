import {meshes} from "./main.js";
import {camera} from "./init.js";

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

	this.rotate = function(xAxis, yAxis, zAxis, O = this) {
		// X rotation
		let cos = Math.cos(xAxis),
			sin = Math.sin(xAxis);

		for (let v of this.vertices) {
			let y = (v[1] - O.position[1]) * cos - (v[2] - O.position[2]) * sin,
				z = (v[1] - O.position[1]) * sin + (v[2] - O.position[2]) * cos;

			v[1] = y + O.position[1];
			v[2] = z + O.position[2];
		}

		// Y rotation
		cos = Math.cos(yAxis);
		sin = Math.sin(yAxis);

		for (let v of this.vertices) {
			let x = (v[2] - O.position[2]) * sin + (v[0] - O.position[0]) * cos,
				z = (v[2] - O.position[2]) * cos - (v[0] - O.position[0]) * sin;

			v[0] = x + O.position[0];
			v[2] = z + O.position[2];
		}

		// Z rotation
		cos = Math.cos(zAxis);
		sin = Math.sin(zAxis);

		for (let v of this.vertices) {
			let x = (v[0] - O.position[0]) * cos - (v[1] - O.position[1]) * sin,
				y = (v[0] - O.position[0]) * sin + (v[1] - O.position[1]) * cos;

			v[0] = x + O.position[0];
			v[1] = y + O.position[1];
		}

		this.rotation = [...arguments];
	};

	meshes.add(this);

	return this;
};
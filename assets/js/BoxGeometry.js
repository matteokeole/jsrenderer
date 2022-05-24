import {meshes} from "./main.js";
import {camera} from "./init.js";
import Vertex from "./Vertex.js";

// A mesh is a set of vertices that define a 3D shape
export default function(w, h, d) {
	this.size = [w, h, d];
	this.size2 = this.size.map(s => s / 2);
	this.scale = (a, b, c) => {
		this.size[0] *= a;
		this.size[1] *= b;
		this.size[2] *= c;

		// Recalc size2
		this.size2 = this.size.map(s => s / 2);

		this.calcVertices();
	};

	this.position = new Vertex(0, 0, 0);
	this.place = function(x, y, z) {
		this.position = new Vertex(...arguments);

		this.calcVertices();
	};
	this.move = function(x, y, z) {
		this.position.add(new Vertex(...arguments));

		this.calcVertices();
	};

	this.rotation = [0, 0, 0]; // In radians

	this.calcVertices = () => {
		this.vertices = [
			[this.position.x - this.size2[0], this.position.y - this.size2[1], this.position.z - this.size2[2]],
			[this.position.x + this.size2[0], this.position.y - this.size2[1], this.position.z - this.size2[2]],
			[this.position.x - this.size2[0], this.position.y + this.size2[1], this.position.z - this.size2[2]],
			[this.position.x + this.size2[0], this.position.y + this.size2[1], this.position.z - this.size2[2]],
			[this.position.x - this.size2[0], this.position.y - this.size2[1], this.position.z + this.size2[2]],
			[this.position.x + this.size2[0], this.position.y - this.size2[1], this.position.z + this.size2[2]],
			[this.position.x - this.size2[0], this.position.y + this.size2[1], this.position.z + this.size2[2]],
			[this.position.x + this.size2[0], this.position.y + this.size2[1], this.position.z + this.size2[2]],
		];
	};

	this.polygons = [
		[0, 1, 2],
		[0, 2, 4],
		[0, 4, 5],
		[1, 0, 5],
		[2, 1, 3],
		[2, 3, 6],
		[3, 1, 5],
		[3, 5, 7],
		[4, 2, 6],
		[5, 4, 6],
		[5, 6, 7],
		[6, 3, 7],
	];

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

const v1 = new Vertex(1, 2, 1);
const v2 = new Vertex(2, 2, 2);
const v3 = v1.substract(v2);

console.log(v3);
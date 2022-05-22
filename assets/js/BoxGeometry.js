import {meshes} from "./main.js";

// A mesh is a set of vertices that define a 3D shape
export default function(w, h, d, position = [0, 0, 0], rotation = [0, 0]) {
	this.type = "box";
	this.size = {
		x: w,
		y: h,
		z: d,
	};
	this.size2 = {
		x: this.size.x / 2,
		y: this.size.y / 2,
		z: this.size.z / 2,
	};
	this.x = position[0];
	this.y = -position[1];
	this.z = -position[2];
	this.rotation = rotation; // In radians
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

	this.displace = ([x = this.x, y = this.y, z = this.z]) => {
		this.x = x;
		this.y = -y;
		this.z = -z;

		this.calcVertices();
	};

	this.move = (x = 0, y = 0, z = 0) => {
		this.x += x;
		this.y -= y;
		this.z -= z;

		this.calcVertices();
	};

	this.rotate = (x, y, z) => {
		this.rotation = [x, y, z];
	};

	this.calcVertices = () => {
		this.vertices = [
			[this.x - this.size2.x, this.y - this.size2.y, this.z - this.size2.z],
			[this.x + this.size2.x, this.y - this.size2.y, this.z - this.size2.z],
			[this.x - this.size2.x, this.y + this.size2.y, this.z - this.size2.z],
			[this.x + this.size2.x, this.y + this.size2.y, this.z - this.size2.z],
			[this.x - this.size2.x, this.y - this.size2.y, this.z + this.size2.z],
			[this.x + this.size2.x, this.y - this.size2.y, this.z + this.size2.z],
			[this.x - this.size2.x, this.y + this.size2.y, this.z + this.size2.z],
			[this.x + this.size2.x, this.y + this.size2.y, this.z + this.size2.z],
		];
	};

	this.calcVertices();

	meshes.add(this);

	return this;
};
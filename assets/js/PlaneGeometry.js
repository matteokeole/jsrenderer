import {meshes} from "./main.js";

export default function(w, d, position = [0, 0, 0], rotation = [0, 0]) {
	this.type = "plane";
	this.size = {
		x: w,
		y: 0,
		z: d,
	};
	this.size2 = {
		x: this.size.x / 2,
		y: 0,
		z: this.size.z / 2,
	};
	this.x = position[0];
	this.y = -position[1];
	this.z = -position[2];
	this.rotation = rotation; // In radians
	this.triangles = [
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
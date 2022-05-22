import {meshes} from "./main.js";

export default function(x, y, z) {
	this.position = [x, y, z];
	this.position.set = (x = this.position[0], y = this.position[1], z = this.position[2]) => {
		this.position = [x, y, z];
	};
	this.rotation = [0, 0, 0];
	this.rotate = (x, y, z) => {
		this.rotation = [x, y, z];

		for (let mesh of meshes) {
			mesh.rotate(this.rotation[0], this.rotation[1], 0);
		}

		debug2.innerText = this.rotation.map(r => r.toFixed(2)).join(" / ");
	};

	this.meshes = new Set();
	this.attach = mesh => this.meshes.add(mesh);
	this.toggle_attach = mesh => {
		this.meshes.has(mesh) ?
			this.meshes.delete(mesh) :
			this.meshes.add(mesh);
	};
	this.detach = mesh => this.meshes.delete(mesh);
	this.move = (x, y, z) => {
		this.position[0] += x;
		this.position[1] -= y;
		this.position[2] -= z;

		for (let mesh of this.meshes) {
			if (mesh.type === "plane") mesh.move(-x, z);
			else mesh.move(-x, -y, -z);
		}
	};

	this.move_forward = value => {
		this.position[2] -= value;

		// Move attached meshes
		for (let mesh of this.meshes) {
			mesh.move(0, 0, -value);
		}

		debug1.innerText = this.position.map(p => p.toFixed(2)).join(" / ");
	};

	this.move_right = value => {
		this.position[0] -= value;

		// Move attached meshes
		for (let mesh of this.meshes) {
			mesh.move(value, 0, 0);
		}

		debug1.innerText = this.position.map(p => p.toFixed(2)).join(" / ");
	};
};
import {meshes} from "./main.js";

export default function() {
	this.position = [0, 0, 0];
	this.place = (x, y, z) => this.position = [x, y, z];

	this.rotation = [0, 0, 0];
	this.rotate = (x, y, z) => this.rotation = [x, y, z];

	// Attached meshes
	this.meshes = new Set();
	this.attach = mesh => this.meshes.add(mesh);
	this.toggle_attach = mesh => {
		this.meshes.has(mesh) ?
			this.meshes.delete(mesh) :
			this.meshes.add(mesh);
	};
	this.detach = mesh => this.meshes.delete(mesh);

	this.move_forward = value => {
		this.position[2] += value;

		// Move attached meshes
		/*for (let mesh of this.meshes) {
			mesh.move(0, 0, -value);
		}*/
	};

	this.move_right = value => {
		this.position[0] += value;

		// Move attached meshes
		/*for (let mesh of this.meshes) {
			mesh.move(value, 0, 0);
		}*/
	};
};
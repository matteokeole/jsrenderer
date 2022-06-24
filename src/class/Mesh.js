import {Vector2, Vector3} from "../module.js";

export const Mesh = function(geometry, color) {
	this.geometry = geometry;

	this.position = new Vector3();
	this.rotation = new Vector3();
	this.scale = this.geometry.type === "plane" ? new Vector2(1, 1) : new Vector3(1);

	this.color = color;

	// Populate the mesh color
	this.colors = [];
	for (let i = 0, l = this.geometry.vertices.length / 3; i < l; i++) {
		this.colors.push(...color.hex);
	}
	this.colors = new Uint8Array(this.colors);

	this.visible = true;

	return this;
};

Mesh.prototype.clone = function() {
	const mesh = new Mesh(this.geometry, this.color);

	mesh.position = this.position.clone();
	mesh.rotation = this.rotation.clone();
	mesh.scale = this.scale.clone();

	mesh.colors = this.colors;

	mesh.visible = this.visible;

	return mesh;
};
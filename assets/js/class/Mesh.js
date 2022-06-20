import {Vector2} from "./Vector2.js";
import {Vector3} from "./Vector3.js";

export const Mesh = function(geometry) {
	this.geometry = geometry;

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.scale = this.geometry.type === "plane" ? new Vector2(1) : new Vector3(1);

	return this;
};

Mesh.prototype.clone = function() {
	const mesh = new Mesh(this.geometry);

	mesh.position = this.position.clone();
	mesh.rotation = this.rotation.clone();
	mesh.scale = this.scale.clone();

	return mesh;
};

/** @todo */
/*Mesh.prototype.applyTexture = function(source) {
	this.texture = new Image();
	this.texture.src = `textures/${source}`;
	this.texture.addEventListener("load", () => {
		this.geometry.indices[0][3] = 0;
		this.geometry.indices[4][3] = 0;
		this.textureBuffer = document.createElement("canvas");
		this.textureBuffer = this.textureBuffer.getContext("2d");
		this.texturePattern = this.textureBuffer.createPattern(this.texture, "no-repeat");
	});
};*/
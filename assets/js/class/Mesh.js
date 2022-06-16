import {Vector3} from "./Vector3.js";

export const Mesh = function(geometry) {
	this.geometry = {
		vertices: geometry.vertices,
		indices: geometry.indices,
	};

	this.position = new Vector3();
	this.rotation = new Vector3();

	this.attachedCamera = null;

	return this;
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
import {Vector3} from "./Vector3.js";
import {meshes} from "./main.js";

export default function Mesh(geometry) {
	this.indexBuffer = geometry.indexBuffer;
	this.updateVertices = geometry.updateVertices;

	this.place(new Vector3());
	this.rotation = new Vector3();

	this.attachedCamera = null;

	meshes.add(this);


	return this;
}

Mesh.prototype.move = function(x, y, z) {
	this.position.add(new Vector3(x, y, z));
	this.vertexBuffer = this.updateVertices(this.position);

	return this;
};

Mesh.prototype.place = function(x, y, z) {
	this.position = new Vector3(x, y, z);
	this.vertexBuffer = this.updateVertices(this.position);

	return this;
};

/*Mesh.prototype.scale = function(w, h, d) {
	this.size[0] *= w;
	this.size[1] *= h;
	this.size[2] *= d;

	this.updateVertices();
};*/

/*Mesh.prototype.rotate = function(xAxis, yAxis, zAxis, O = this) {
	// X rotation
	let cos = Math.cos(-xAxis),
		sin = Math.sin(-xAxis);

	for (let v of this.vertexBuffer) {
		let y = (v.y - O.position.y) * cos - (v.z - O.position.z) * sin,
			z = (v.y - O.position.y) * sin + (v.z - O.position.z) * cos;

		v.y = y + O.position.y;
		v.z = z + O.position.z;
	}

	// Y rotation
	cos = Math.cos(-yAxis);
	sin = Math.sin(-yAxis);

	for (let v of this.vertexBuffer) {
		let x = (v.z - O.position.z) * sin + (v.x - O.position.x) * cos,
			z = (v.z - O.position.z) * cos - (v.x - O.position.x) * sin;

		v.x = x + O.position.x;
		v.z = z + O.position.z;
	}

	// Z rotation
	cos = Math.cos(zAxis);
	sin = Math.sin(zAxis);

	for (let v of this.vertexBuffer) {
		let x = (v.x - O.position.x) * cos - (v.y - O.position.y) * sin,
			y = (v.x - O.position.x) * sin + (v.y - O.position.y) * cos;

		v.x = x + O.position.x;
		v.y = y + O.position.y;
	}

	this.rotation = new Vector3(xAxis, yAxis, zAxis);
};*/

// Applies a texture on the first triangle
Mesh.prototype.applyTexture = function(source) {
	this.texture = new Image();
	this.texture.src = `textures/${source}`;
	this.texture.addEventListener("load", () => {
		this.indexBuffer[0][3] = 0;
		this.indexBuffer[4][3] = 0;
		this.textureBuffer = document.createElement("canvas");
		this.textureBuffer = this.textureBuffer.getContext("2d");
		this.texturePattern = this.textureBuffer.createPattern(this.texture, "no-repeat");
	});
};
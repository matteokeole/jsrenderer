import * as Utils from "../utils.js";
import {Vector3} from "./Vector3.js";

export const Renderer = function(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.style.display = "block";
	this.canvas.textContent = "This browser does not support Canvas API.";
	this.canvas.requestPointerLock ||= this.canvas.mozRequestPointerLock;

	// Set canvas size
	this.stretch(width, height);

	this.ctx = this.canvas.getContext("2d");

	document.body.appendChild(this.canvas);

	return this;
};

Renderer.prototype.lock = function() {
	this.canvas.requestPointerLock();
};

Renderer.prototype.isLocked = function() {
	return this.canvas === document.pointerLockElement || this.canvas == document.mozPointerLockElement;
};

Renderer.prototype.stretch = function(width = innerWidth, height = innerHeight) {
	this.width = width;
	this.height = height;
	this.halfWidth = this.width / 2;
	this.halfHeight = this.height / 2;

	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Renderer.prototype.render = function(scene, camera) {
	this.ctx.clearRect(0, 0, this.width, this.height);

	for (let mesh of scene.meshes) {
		let geometry = mesh.geometry,
			vertices = [...geometry.vertices];

		// Transform vertices
		for (let v in vertices) {
			vertices[v] = Utils.transform(vertices[v], mesh, camera);
		}

		// Loop through the mesh indices and draw the associated transformed polygon
		for (let i of geometry.indices) {
			let polygon = [
				Utils.viewport(Utils.project(vertices[i[0]], camera), this),
				Utils.viewport(Utils.project(vertices[i[1]], camera), this),
				Utils.viewport(Utils.project(vertices[i[2]], camera), this),
			];

			if (Utils.bfc(...polygon)) {
				this.ctx.beginPath();
				this.ctx.moveTo(...polygon[0]);
				this.ctx.lineTo(...polygon[1]);
				this.ctx.lineTo(...polygon[2]);
				this.ctx.closePath();
				this.ctx.stroke();

				// Texturing tests
				/*if (i[3] !== undefined) {
					this.ctx.save();
					this.ctx.fillStyle = mesh.texturePattern;
					let dz = 1 / (mesh.position.z - camera.position.z) * 3;
					this.ctx.setTransform(
						dz,
						0,
						0,
						dz,
						...polygon[i[3]],
					);
					this.ctx.rotate(camera.rotation.y / 10);
					this.ctx.fill();
					this.ctx.restore();
				}*/
			}
		}

		debugMPosition.textContent = mesh.position;
		debugMRotation.textContent = mesh.rotation;
	}

	debugPosition.textContent = camera.position;
	debugRotation.textContent = camera.rotation;
};
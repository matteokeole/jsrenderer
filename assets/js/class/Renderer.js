import {BACKFACE_CULLING, WIREFRAME_COLOR} from "../config.js";
import {Vector3} from "./Vector3.js";
import * as Utils from "../utils.js";

export const Renderer = function(width, height) {
	this.width = null;
	this.height = null;
	this.halfWidth = null;
	this.halfHeight = null;

	this.canvas = document.createElement("canvas");
	this.canvas.textContent = "This browser does not support Canvas API.";
	this.canvas.style.display = "block";
	this.canvas.requestPointerLock ||= this.canvas.mozRequestPointerLock;

	this.ctx = this.canvas.getContext("2d");

	// Set canvas size
	this.stretch(width, height);

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

	// Reset context stroke color
	this.ctx.strokeStyle = WIREFRAME_COLOR;
};

Renderer.prototype.render = function(scene, camera) {
	this.ctx.fillStyle = scene.background;
	this.ctx.fillRect(0, 0, this.width, this.height);

	for (let mesh of scene.meshes) {
		let geometry = mesh.geometry,
			vertices = [...geometry.vertices];

		// Transform the vertices, project them and adapt them to the viewport
		for (let v in vertices) {
			vertices[v] = Utils.viewport(Utils.project(Utils.transform(vertices[v], mesh, camera), camera.fov), this);
		}

		// Loop through the mesh indices and draw the associated transformed polygon
		for (let i of geometry.indices) {
			let polygon = [vertices[i[0]], vertices[i[1]], vertices[i[2]]],
				bfc = BACKFACE_CULLING ? Utils.bfc(...polygon) : true;

			if (bfc) {
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
	}

	debugPosition.textContent = camera.position;
	debugRotation.textContent = camera.rotation;
};
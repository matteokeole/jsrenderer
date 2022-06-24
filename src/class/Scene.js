import {Color} from "../module.js";

/** @todo */
export const Scene = function() {
	this.background = new Color(0x000000);

	this.meshes = new Set();

	return this;
};

/** @todo */
Scene.prototype.add = function(...meshes) {
	for (let mesh of meshes) this.meshes.add(mesh);

	return this;
};

/** @todo */
Scene.prototype.remove = function(...meshes) {
	for (let mesh of meshes) this.meshes.delete(mesh);

	return this;
};
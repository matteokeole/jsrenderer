import {Color} from "../module.js";

/** @todo */
export const Scene = function() {
	this.background = new Color(0x000000);

	this.objects = new Set();
	this.cameras = new Set();
	this.meshes = new Set();

	return this;
};

/** @todo */
Scene.prototype.add = function(...objects) {
	for (let object of objects) {
		this.objects.add(object);

		switch (object.type) {
			case "camera": this.cameras.add(object); break;
			case "mesh": this.meshes.add(object); break;
		}
	}

	return this;
};

/** @todo */
Scene.prototype.remove = function(...objects) {
	for (let object of objects) {
		this.objects.delete(object);

		switch (object.type) {
			case "camera": this.cameras.delete(object); break;
			case "mesh": this.meshes.delete(object); break;
		}
	}

	return this;
};
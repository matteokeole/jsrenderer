import {Color} from "../module.js";

/** @todo */
export const Scene = function() {
	this.background = new Color(0x000000);

	this.objects = new Set();

	return this;
};

/** @todo */
Scene.prototype.add = function(...objects) {
	for (let object of objects) this.objects.add(object);

	return this;
};

/** @todo */
Scene.prototype.remove = function(...objects) {
	for (let object of objects) this.objects.delete(object);

	return this;
};
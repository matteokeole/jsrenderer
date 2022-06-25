import {Vector3} from "../module.js";

export const DirectionalLight = function() {
	this.type = "light";
	this.lightType = "directional";

	this.direction = new Vector3(0, 1, 0);

	this.visible = true;

	return this;
};
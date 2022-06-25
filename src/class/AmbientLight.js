export const AmbientLight = function(intensity) {
	this.type = "light";
	this.lightType = "ambient";

	this.intensity = intensity;

	this.visible = true;

	return this;
};
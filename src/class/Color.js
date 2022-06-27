export const Color = function(color) {
	this.color = color;

	this.hex = [
		(this.color >> 16 & 255),
		(this.color >> 8 & 255),
		(this.color & 255),
	];

	this.hex1 = [
		(this.color >> 16 & 255) / 255,
		(this.color >> 8 & 255) / 255,
		(this.color & 255) / 255,
		1,
	];

	return this;
};
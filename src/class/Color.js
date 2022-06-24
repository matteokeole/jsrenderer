export const Color = function(value) {
	this.value = value;

	this.hex = [
		(this.value >> 16 & 255),
		(this.value >> 8 & 255),
		(this.value & 255),
	];

	this.hex1 = [
		(this.value >> 16 & 255) / 255,
		(this.value >> 8 & 255) / 255,
		(this.value & 255) / 255,
		1,
	];

	return this;
};
export default function Vector(x, y, z) {
	// Vector points
	[this[0], this[1], this[2]] = [...arguments];

	// Vector addition
	this.add = vector => new Vector(
		this[0] + vector[0],
		this[1] + vector[1],
		this[2] + vector[2],
	);

	this.substract = vector => this.add(vector.scale(-1));

	this.scale = scale => new Vector(
		this[0] * scale,
		this[1] * scale,
		this[2] * scale,
	);
}
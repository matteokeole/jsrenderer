export default function Vertex(x, y, z) {
	// Vertex coordinates
	[this[0], this[1], this[2]] = [...arguments];

	/*// Vertex addition
	this.add = vertex => new Vertex(
		this[0] + vertex[0],
		this[1] + vertex[1],
		this[2] + vertex[2],
	);

	this.substract = vertex => this.add(vertex.scale(-1));

	this.scale = scale => new Vertex(
		this[0] * scale,
		this[1] * scale,
		this[2] * scale,
	);*/
}

Vertex.prototype = Array.prototype;
/**
 * Creates a point in the object space.
 * 
 * @constructor
 * 
 * @param	{number}	x	X coordinate
 * @param	{number}	y	Y coordinate
 * @param	{number}	z	Z coordinate
 * 
 * @returns	{Vertex}
 */
export default function Vertex(x, y, z) {
	// Coordinates
	[this.x, this.y, this.z] = [...arguments];

	/**
	 * Adds two vertices and returns the result into a new vertex.
	 * 
	 * @param	{Vertex}	v	Second vertex
	 * 
	 * @returns	{Vertex}
	 */
	this.add = v => new Vertex(
		this.x + v.x,
		this.y + v.y,
		this.z + v.z,
	);

	/**
	 * Substracts two vertices and returns the result into a new vertex.
	 * Equivalent of adding two vertices with one scaled to -1.
	 * // this.substract = v => this.add(v.scale(-1));
	 * 
	 * @param	{Vertex}	v	Second vertex
	 * 
	 * @returns	{Vertex}
	 */
	this.substract = v => new Vertex(
		this.x - v.x,
		this.y - v.y,
		this.z - v.z,
	);

	/**
	 * Scales two vertices and returns the result into a new vertex.
	 * 
	 * @param	{number}	f	Scale factor
	 * 
	 * @returns	{Vertex}
	 */
	this.scale = f => new Vertex(
		this.x * f,
		this.y * f,
		this.z * f,
	);

	/** @returns {string} */
	this.toString = () => `${this.x.toFixed(2)} / ${this.y.toFixed(2)} / ${this.z.toFixed(2)}`;

	return this;
}
import Vertex from "./Vertex.js";

export default function() {
	// Camera center coordinates
	this.position = new Vertex(0, 0, 0);

	/**
	 * @param	{number}	x	Destination X coordinate
	 * @param	{number}	y	Destination Y coordinate
	 * @param	{number}	z	Destination Z coordinate
	 */
	this.place = function(x, y, z) {this.position = new Vertex(...arguments)};

	/**
	 * @param	{number}	x	Added X coordinate
	 * @param	{number}	y	Added Y coordinate
	 * @param	{number}	z	Added Z coordinate
	 */
	this.move = function(x, y, z) {
		let v = new Vertex(...arguments);

		this.position = this.position.add(v);
	};

	this.moveForward = n => {
		// x1 = x + n * cos(theta)
		// (theta is the angle)
		let x = this.position.x + n * Math.sin(this.rotation[1]),
			z = this.position.z + n * Math.cos(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;
	};

	this.moveRight = n => {
		let x = this.position.x + n * Math.cos(this.rotation[1]),
			z = this.position.z - n * Math.sin(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;
	};

	// Rotation angle
	this.rotation = [0, 0, 0];

	/**
	 * @param	{number}	x	X angle
	 * @param	{number}	y	Y angle
	 * @param	{number}	z	Z angle
	 */
	this.rotate = function(x, y, z) {this.rotation = [...arguments]};
};
import {meshes} from "./main.js";
import Vertex from "./Vertex.js";

/**
 * A mesh is a set of vertices that define a 3D shape.
 * 
 * @summary	Box geometry constructor
 */
export default function(w, h, d) {
	this.vertexBuffer = [];
	this.indexBuffer = [
		[0, 1, 2],
		[0, 2, 4],
		[0, 4, 5],
		[1, 0, 5],
		[2, 1, 3],
		[2, 3, 6],
		[3, 1, 5],
		[3, 5, 7],
		[4, 2, 6],
		[5, 4, 6],
		[5, 6, 7],
		[6, 3, 7],
	];

	/**
	 * Re-calculates the vertex buffer when a placement update occurs.
	 */
	this.updateVertices = () => {
		const s2 = this.size.map(s => s / 2);

		// Generate vertices
		this.vertexBuffer = [
			new Vertex(
				this.position.x - s2[0],
				this.position.y - s2[1],
				this.position.z - s2[2],
			),
			new Vertex(
				this.position.x + s2[0],
				this.position.y - s2[1],
				this.position.z - s2[2],
			),
			new Vertex(
				this.position.x - s2[0],
				this.position.y + s2[1],
				this.position.z - s2[2],
			),
			new Vertex(
				this.position.x + s2[0],
				this.position.y + s2[1],
				this.position.z - s2[2],
			),
			new Vertex(
				this.position.x - s2[0],
				this.position.y - s2[1],
				this.position.z + s2[2],
			),
			new Vertex(
				this.position.x + s2[0],
				this.position.y - s2[1],
				this.position.z + s2[2],
			),
			new Vertex(
				this.position.x - s2[0],
				this.position.y + s2[1],
				this.position.z + s2[2],
			),
			new Vertex(
				this.position.x + s2[0],
				this.position.y + s2[1],
				this.position.z + s2[2],
			),
		];
	};

	// Mesh center coordinates
	this.position = new Vertex(0, 0, 0);

	/**
	 * @param	{number}	x	Destination X coordinate
	 * @param	{number}	y	Destination Y coordinate
	 * @param	{number}	z	Destination Z coordinate
	 * 
	 * @callback BoxGeometry~updateVertices
	 */
	this.place = function(x, y, z) {
		this.position = new Vertex(...arguments);

		this.updateVertices();
	};

	/**
	 * @param	{number}	x	Added X coordinate
	 * @param	{number}	y	Added Y coordinate
	 * @param	{number}	z	Added Z coordinate
	 * 
	 * @callback BoxGeometry~updateVertices
	 */
	this.move = function(x, y, z) {
		this.position.add(new Vertex(...arguments));

		this.updateVertices();
	};

	this.size = [w, h, d];
	this.scale = (a, b, c) => {
		this.size[0] *= a;
		this.size[1] *= b;
		this.size[2] *= c;

		this.updateVertices();
	};

	// Rotation angle
	this.rotation = [0, 0, 0];

	this.rotate = function(xAxis, yAxis, zAxis, O = this) {
		// X rotation
		let cos = Math.cos(-xAxis),
			sin = Math.sin(-xAxis);

		for (let v of this.vertexBuffer) {
			let y = (v.y - O.position.y) * cos - (v.z - O.position.z) * sin,
				z = (v.y - O.position.y) * sin + (v.z - O.position.z) * cos;

			v.y = y + O.position.y;
			v.z = z + O.position.z;
		}

		// Y rotation
		cos = Math.cos(-yAxis);
		sin = Math.sin(-yAxis);

		for (let v of this.vertexBuffer) {
			let x = (v.z - O.position.z) * sin + (v.x - O.position.x) * cos,
				z = (v.z - O.position.z) * cos - (v.x - O.position.x) * sin;

			v.x = x + O.position.x;
			v.z = z + O.position.z;
		}

		// Z rotation
		cos = Math.cos(zAxis);
		sin = Math.sin(zAxis);

		for (let v of this.vertexBuffer) {
			let x = (v.x - O.position.x) * cos - (v.y - O.position.y) * sin,
				y = (v.x - O.position.x) * sin + (v.y - O.position.y) * cos;

			v.x = x + O.position.x;
			v.y = y + O.position.y;
		}

		this.rotation = [...arguments];
	};

	this.attachedCamera = null;

	this.updateVertices();

	meshes.add(this);

	return this;
};
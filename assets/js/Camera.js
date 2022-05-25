import {cameras} from "./main.js";
import Vertex from "./Vertex.js";

/**
 * @todo Documentation
 * 
 * @returns Camera
 */
export default function() {
	// Camera center coordinates
	this.position = new Vertex(0, 0, 0);

	/**
	 * @param	{number}	x	Destination X coordinate
	 * @param	{number}	y	Destination Y coordinate
	 * @param	{number}	z	Destination Z coordinate
	 */
	this.place = function(x, y, z) {
		this.position = new Vertex(...arguments);

		debug1.innerText = currentCamera.position.toString();
	};

	/**
	 * @param	{number}	x	Added X coordinate
	 * @param	{number}	y	Added Y coordinate
	 * @param	{number}	z	Added Z coordinate
	 */
	this.move = function(x, y, z) {
		let v = new Vertex(...arguments);

		this.position = this.position.add(v);

		debug1.innerText = currentCamera.position.toString();
	};

	this.moveForward = n => {
		// x1 = x + n * cos(theta)
		// (theta is the angle)
		let x = this.position.x + n * Math.sin(this.rotation[1]),
			z = this.position.z + n * Math.cos(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;

		debug1.innerText = currentCamera.position.toString();
	};

	this.moveRight = n => {
		let x = this.position.x + n * Math.cos(this.rotation[1]),
			z = this.position.z - n * Math.sin(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;

		debug1.innerText = currentCamera.position.toString();
	};

	// Rotation angle
	this.rotation = [0, 0, 0];

	/**
	 * @param	{number}	x	X angle
	 * @param	{number}	y	Y angle
	 * @param	{number}	z	Z angle
	 */
	this.rotate = function(x, y, z) {
		this.rotation = [...arguments];

		debug2.innerText = currentCamera.rotation.map(a => a.toFixed(2)).join(" / ");
	};

	/**
	 * @param	{number}	x	X angle
	 * @param	{number}	y	Y angle
	 * @param	{number}	z	Z angle
	 */
	this.addRotation = function(x, y, z) {
		this.rotation = this.rotation.map((a, i) => a += [...arguments][i]);

		debug2.innerText = currentCamera.rotation.map(a => a.toFixed(2)).join(" / ");
	};

	/** @todo Advanced attachment methods */
	this.attachedMeshes = new Set();

	/** @todo Documentation */
	this.attach = mesh => {
		mesh.attachedCamera = this;
		this.attachedMeshes.add(mesh);
	}

	/** @todo Documentation */
	this.detach = mesh => {
		mesh.attachedCamera = null;
		this.attachedMeshes.remove(mesh);
	}

	this.setCurrent = () => {
		currentCamera = this;

		debug3.innerText = [...cameras].indexOf(this) + 1;
	}

	cameras.add(this);
	currentCamera === undefined && this.setCurrent();

	return this;
};
export let currentCamera;
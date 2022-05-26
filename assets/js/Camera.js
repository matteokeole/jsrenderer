import {cameras} from "./main.js";
import Vector3 from "./Vector3.js";

/**
 * @todo Documentation
 * 
 * @returns Camera
 */
export default function() {
	/**
	 * @param	{number}	x	Destination X coordinate
	 * @param	{number}	y	Destination Y coordinate
	 * @param	{number}	z	Destination Z coordinate
	 */
	this.place = function(x, y, z) {
		this.position = new Vector3(...arguments);

		debugPosition.innerText = currentCamera.position.toString();
	};

	/**
	 * @param	{number}	x	Added X coordinate
	 * @param	{number}	y	Added Y coordinate
	 * @param	{number}	z	Added Z coordinate
	 */
	this.move = function(x, y, z) {
		let v = new Vector3(...arguments);

		this.position = this.position.add(v);

		debugPosition.innerText = currentCamera.position.toString();
	};

	this.moveForward = n => {
		// x1 = x + n * cos(theta)
		// (theta is the angle)
		let x = this.position.x + n * Math.sin(this.rotation[1]),
			z = this.position.z + n * Math.cos(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;

		debugPosition.innerText = currentCamera.position.toString();
	};

	this.moveRight = n => {
		let x = this.position.x + n * Math.cos(this.rotation[1]),
			z = this.position.z - n * Math.sin(this.rotation[1]);

		this.position.x = x;
		this.position.z = z;

		debugPosition.innerText = currentCamera.position.toString();
	};

	this.ascend = n => {
		this.position.y += n;
	};

	/**
	 * @param	{number}	x	X angle
	 * @param	{number}	y	Y angle
	 * @param	{number}	z	Z angle
	 */
	this.rotate = function(x, y, z) {
		this.rotation = [...arguments];

		debugRotation.innerText = currentCamera.rotation.map(a => a.toFixed(2)).join(" / ");
	};

	/**
	 * @param	{number}	x	X angle
	 * @param	{number}	y	Y angle
	 * @param	{number}	z	Z angle
	 */
	this.addRotation = function(x, y, z) {
		this.rotation = this.rotation.map((a, i) => a += [...arguments][i]);

		debugRotation.innerText = currentCamera.rotation.map(a => a.toFixed(2)).join(" / ");
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

		debugCamera.innerText = [...cameras].indexOf(this) + 1;
	}

	cameras.add(this);
	currentCamera === undefined && this.setCurrent();

	this.place(0, 0, 0);
	this.rotate(0, 0, 0);

	return this;
};
export let currentCamera;
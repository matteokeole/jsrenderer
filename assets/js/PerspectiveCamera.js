import {cameras} from "./main.js";
import {Vector3} from "./Vector3.js";

/**
 * @todo Documentation
 * 
 * @returns PerspectiveCamera
 */
export default function(fov, near, far) {
	this.P = fov;
	this.near = near;
	this.far = far;
	this.position = new Vector3();
	this.rotation = new Vector3();

	/**
	 * @param	{number}	x
	 * @param	{number}	y
	 * @param	{number}	z
	 */
	this.place = function(x, y, z) {
		this.position = new Vector3(x, y, z);

		debugPosition.textContent = currentCamera.position.toString();
	};

	/**
	 * @param	{number}	x
	 * @param	{number}	y
	 * @param	{number}	z
	 */
	this.move = function(x, y, z) {
		this.position = this.position.add(new Vector3(x, y, z));

		debugPosition.textContent = currentCamera.position.toString();
	};

	this.moveForward = n => {
		let x = n * Math.sin(this.rotation.y),
			z = n * Math.cos(this.rotation.y);

		this.position.x += x;
		this.position.z += z;

		debugPosition.textContent = currentCamera.position.toString();
	};

	this.moveRight = n => {
		let x = n * Math.cos(this.rotation.y),
			z = n * Math.sin(this.rotation.y);

		this.position.x += x;
		this.position.z -= z;

		debugPosition.textContent = currentCamera.position.toString();
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

		debugCamera.textContent = [...cameras].indexOf(this) + 1;
	}

	cameras.add(this);
	if (currentCamera === undefined) this.setCurrent();

	return this;
}

export let currentCamera;
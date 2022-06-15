import {Vector3} from "./Vector3.js";

export function Cylinder(radius, height, segments) {
	this.size = [
		radius * 2,
		height,
		radius * 2,
	];

	this.updateVertices = v => {
		let midSize = this.size.map(s => s / 2);

		return [
			new Vector3(
				v.x - midSize[0],
				v.y - midSize[1],
				v.z - midSize[2],
			),
			new Vector3(
				v.x + midSize[0],
				v.y - midSize[1],
				v.z - midSize[2],
			),
			new Vector3(
				v.x - midSize[0],
				v.y + midSize[1],
				v.z - midSize[2],
			),
			new Vector3(
				v.x + midSize[0],
				v.y + midSize[1],
				v.z - midSize[2],
			),
		];
	};

	this.indexBuffer = [
		[0, 1, 2],
	];

	return this;
}
import {Vector3} from "./Vector3.js";

export function Box(width, height, depth) {
	this.size = [
		width,
		height,
		depth,
	];

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
			new Vector3(
				v.x - midSize[0],
				v.y - midSize[1],
				v.z + midSize[2],
			),
			new Vector3(
				v.x + midSize[0],
				v.y - midSize[1],
				v.z + midSize[2],
			),
			new Vector3(
				v.x - midSize[0],
				v.y + midSize[1],
				v.z + midSize[2],
			),
			new Vector3(
				v.x + midSize[0],
				v.y + midSize[1],
				v.z + midSize[2],
			),
		];
	};

	return this;
}
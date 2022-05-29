import {meshes} from "./main.js";
import {project, bfc} from "./magic.js";
import {Viewport} from "./vars.js";

export default (canvas, camera) => {
	let ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, Viewport.width, Viewport.height);

	for (let mesh of meshes) {
		// Loop through the mesh index buffer and draw the associated polygon
		for (let polygon of mesh.indexBuffer) {
			// Project each polygon vector
			let p = [
					project(mesh.vertexBuffer[polygon[0]], mesh, camera),
					project(mesh.vertexBuffer[polygon[1]], mesh, camera),
					project(mesh.vertexBuffer[polygon[2]], mesh, camera),
				],
				culling = bfc(...p);

			if (culling) {
				ctx.beginPath();
				ctx.moveTo(...p[0]);
				ctx.lineTo(...p[1]);
				ctx.lineTo(...p[2]);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
};







// Z-Buffer tests
// let DepthBuffer = new Map();
/*for (let i in p) {
	let v = mesh.vertexBuffer[polygon[i]],
		d = v.distanceTo(camera.position);

	if (
		DepthBuffer.get(`${p[i][0]}-${p[i][1]}`) === undefined ||
		DepthBuffer.get(`${p[i][0]}-${p[i][1]}`) > d
	) {
		DepthBuffer.set(`${p[i][0]}-${p[i][1]}`, d);

		ctx.fillStyle = `rgb(${255 - d * 20}, ${255 - d * 20}, ${255 - d * 20})`;
		ctx.font = `16px Consolas`;
		ctx.fillText(`(${p[i]})`, p[i][0] + 2, p[i][1] - 6);
	}
}*/
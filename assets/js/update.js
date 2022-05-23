import {meshes, ctx} from "./main.js";
import {camera} from "./init.js";
import {keys} from "./input-handler.js";
import {convert3d, facing_side} from "./magic.js";
import {SCREEN, VELOCITY, Keybind} from "./vars.js";

export default () => {
	// Clear the canvas
	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	// Control keys
	if (keys.has(Keybind.forward))	camera.move_forward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.move_forward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.move_right(-VELOCITY);
	if (keys.has(Keybind.right))	camera.move_right(VELOCITY);

	// Render meshes
	debug1.innerText = camera.rotation.map(p => p.toFixed(2)).join(" / ");
	for (let mesh of meshes) {
		debug2.innerText = mesh.position.map(p => p.toFixed(2)).join(" / ");

		// 1. calc mesh own rotation
		// 2. rotate mesh regarding the camera rotation

		// Mesh rotation animation
		// mesh.rotate(performance.now() / 3000, performance.now() / 2000, 0);

		for (let triangle of mesh.triangles) {
			const
				p0		= convert3d(mesh, mesh.vertices[triangle[0]]),
				p1		= convert3d(mesh, mesh.vertices[triangle[1]]),
				p2		= convert3d(mesh, mesh.vertices[triangle[2]]),
				culling	= facing_side(p0, p1, p2);

			if (triangle[3]) ctx.fillStyle = triangle[3];

			// Back-face culling
			if (culling > 0) {
				ctx.beginPath();
				ctx.moveTo(...p0);
				ctx.lineTo(...p1);
				ctx.lineTo(...p2);
				ctx.closePath();
				triangle[3] && ctx.fill();
				ctx.stroke();
			}
		}
	}
};
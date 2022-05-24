import {meshes, ctx} from "./main.js";
import {camera} from "./init.js";
import {keys} from "./input-handler.js";
import {convert} from "./magic.js";
import get_culling from "./culling.js";
import {SCREEN, VELOCITY, Keybind} from "./vars.js";

/**
 * Update function, executed at each valid frame.
 */
export default () => {
	// Clear the canvas
	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	// Control keys
	if (keys.has(Keybind.forward))	camera.move_forward(VELOCITY);
	if (keys.has(Keybind.backward))	camera.move_forward(-VELOCITY);
	if (keys.has(Keybind.left))		camera.move_right(-VELOCITY);
	if (keys.has(Keybind.right))	camera.move_right(VELOCITY);

	// Render meshes
	for (let mesh of meshes) {
		// Mesh rotation animation
		// mesh.rotate(0, 1 * Math.PI / 180, 0);

		for (let triangle of mesh.triangles) {
			const
				p0		= convert(mesh, mesh.vertices[triangle[0]]),
				p1		= convert(mesh, mesh.vertices[triangle[1]]),
				p2		= convert(mesh, mesh.vertices[triangle[2]]),
				culling	= get_culling(p0, p1, p2);

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

		debug1.innerText = camera.position.map(a => a.toFixed(2)).join(" / ");
	}

	debug2.innerText = camera.rotation.map(a => a.toFixed(2)).join(" / ");
};
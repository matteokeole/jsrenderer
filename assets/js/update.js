import {meshes, ctx, camera} from "./main.js";
import {keys} from "./input-handler.js";
import {convert3d, facing_side} from "./magic.js";
import {SCREEN, VELOCITY, Keybind} from "./vars.js";

export default () => {
	// Clear the canvas
	ctx.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	// Control keys
	if (keys.has(Keybind.walk_forward))		camera.move_forward(VELOCITY);
	if (keys.has(Keybind.walk_backward))	camera.move_forward(-VELOCITY);
	if (keys.has(Keybind.walk_left))		camera.move_right(-VELOCITY);
	if (keys.has(Keybind.walk_right))		camera.move_right(VELOCITY);

	// Render meshes
	for (let mesh of meshes) {
		debug2.innerText = mesh.position.map(p => p.toFixed(2)).join(" / ");
		// Mesh rotation animation
		// mesh.rotate(performance.now() / 3000, performance.now() / 2000, 0);

		for (let triangle of mesh.triangles) {
			const
				p0		= convert3d(mesh, mesh.vertices[triangle[0]]),
				p1		= convert3d(mesh, mesh.vertices[triangle[1]]),
				p2		= convert3d(mesh, mesh.vertices[triangle[2]]),
				facing	= facing_side(p0, p1, p2);

			if (triangle[3]) ctx.fillStyle = triangle[3];

			// Back-face culling
			if (facing < 0) {
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
const perspective = (x, z) => fov * x / z;
const project = v => [innerWidth / 2 + perspective(v[0], v[2]), innerHeight / 2 + perspective(v[1], v[2])];
const facingSide = (x0, y0, x1, y1, x2, y2) => (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
const rotate2D = (x, z, rad) => {
	let c = Math.cos(rad),
		s = Math.sin(rad);

	return [
		x * c - z * s,
		x * s + z * c,
	];
}
const convert3D = vertices => {
	let rv0 = rotate2D(vertices[0], vertices[2], Mesh.rot[1]),
		rv1 = rotate2D(vertices[1], rv0[1], Mesh.rot[0]),
		nv = [rv0[0], rv1[0], rv1[1]].map((p, i) => p += Camera.pos[i]),
		projection = project(nv);

	return projection;
}

function frame() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx = canvas.getContext("2d");

	Mesh.rot[0] = performance.now() / 2000; // Vertical
	Mesh.rot[1] = performance.now() / 3000; // Horizontal

	for (let triangle of triangles) {
		ctx.fillStyle = `rgb(${triangle[3]})`;

		let p0		= convert3D(vertices[triangle[0]]),
			p1		= convert3D(vertices[triangle[1]]),
			p2		= convert3D(vertices[triangle[2]]),
			facing	= facingSide(...p0, ...p1, ...p2);

		if (facing > 0) {
			ctx.beginPath();
			ctx.moveTo(...p0);
			ctx.lineTo(...p1);
			ctx.lineTo(...p2);
			ctx.closePath();
			ctx.fill();
		}
	}
}

const
	vertices = [
		[-1, -1, -1],
		[1, -1, -1],
		[-1, 1, -1],
		[1, 1, -1],
		[-1, -1, 1],
		[1, -1, 1],
		[-1, 1, 1],
		[1, 1, 1],
	],
	triangles = [
		[0, 1, 2, [255, 0, 0]],
		[2, 1, 3, [255, 0, 0]],
		[5, 4, 6, [0, 255, 0]],
		[5, 6, 7, [0, 255, 0]],
		[3, 5, 7, [0, 0, 255]],
		[3, 1, 5, [0, 0, 255]],
		[4, 2, 6, [255, 0, 255]],
		[0, 2, 4, [255, 0, 255]],
		[0, 4, 5, [255, 255, 0]],
		[1, 0, 5, [255, 255, 0]],
		[2, 3, 6, [0, 255, 255]],
		[6, 3, 7, [0, 255, 255]],
	],
	Mesh = {rot: [0, 0]},
	Camera = {pos: [0, 0, 5]},
	fov = innerWidth / 2,
	fps = 30;

frame();
setInterval(frame, 1000 / fps);
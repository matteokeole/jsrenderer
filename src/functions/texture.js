export const load_texture = (gl, path) => {
	const texture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, texture);

	let level = 0,
		internalFormat = gl.RGBA,
		width = 1,
		height = 1,
		border = 0,
		srcFormat = gl.RGBA,
		srcType = gl.UNSIGNED_BYTE,
		pixel = new Uint8Array([0, 0, 255, 255]);

	gl.texImage2D(
		gl.TEXTURE_2D,
		level,
		internalFormat,
		width,
		height,
		border,
		srcFormat,
		srcType,
		pixel,
	);

	const image = new Image();
	image.src = path;
	image.addEventListener("load", () => {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(
			gl.TEXTURE_2D,
			level,
			internalFormat,
			srcFormat,
			srcType,
			image,
		);
	});

	return texture;
};
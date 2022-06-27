export const loadTexture = (gl, t) => {
	t.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, t.texture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		1,
		1,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		new Uint8Array([0, 0, 0, 0]),
	);

	t.image.addEventListener("load", () => {
		t.loadState = 2;

		gl.bindTexture(gl.TEXTURE_2D, t.texture);
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			t.image,
		);
		gl.generateMipmap(gl.TEXTURE_2D);
	});
	t.image.src = t.src;
};
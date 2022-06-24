export const
	/**
	 * Creates and compiles a shader.
	 * 
	 * @async
	 * @param	{WebGL2RenderingContext}	gl		WebGL context
	 * @param	{number}					type	Shader type (VERTEX_SHADER/FRAGMENT_SHADER)
	 * @param	{string}					path	Shader file relative path
	 * @returns	{WebGLShader}
	 */
	loadShader = async (gl, type, path) => {
		const
			shader = gl.createShader(type),
			source = await (await fetch(path, {headers: {"Cache-Control": "no-store"}})).text();

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		// Catch shader compilation errors before returning it
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(`${type === 35633 ? "VERTEX" : "FRAGMENT"} SHADER ${gl.getShaderInfoLog(shader)}`);

			return gl.deleteShader(shader);
		}

		shader.source = source;

		return shader;
	},
	/**
	 * Puts the shader attributes and uniforms into the context object.
	 * 
	 * @param	{WebGL2RenderingContext}	gl		WebGL context
	 * @param	{WebGLShader}				shader	Vertex shader or fragment shader
	 */
	parseShader = (gl, shader) => {
		let attribute = gl.attribute ?? {},
			uniform = gl.uniform ?? {};

		// Retrieve the code before main() declaration
		let lines = shader.source
			.split("void main()")[0]
			.match(/[^\n\r\t]+/g);

		for (let line of lines) {
			// Ignore comments
			if (/^\/\/.+/.test(line)) continue;

			let tokens = line.split(/ |;/).slice(0, -1);

			for (let token of tokens) {
				switch (true) {
					// Parse attributes
					case /^a_/.test(token): {
						attribute[token.slice(2)] = gl.getAttribLocation(gl.shader, token);

						break;
					}
					// Parse uniforms
					case /^u_/.test(token): {
						uniform[token.slice(2)] = gl.getUniformLocation(gl.shader, token);

						break;
					}
				}
			}
		}

		Object.assign(gl, {attribute, uniform});
	};
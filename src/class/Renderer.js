import {SCALE_MULTIPLIER} from "../../public/config.js";
import {Vector3, Matrix4, loadShader, parseShader} from "../module.js";

export const Renderer = function(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.style.display = "block";
	this.canvas.textContent = "This browser does not support Canvas API.";

	// Configure WebGL context
	this.gl = this.canvas.getContext("webgl2");
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.buffer = {
		vertex: this.gl.createBuffer(),
		color: this.gl.createBuffer(),
		index: this.gl.createBuffer(),
	};

	this.primitiveType = this.gl.TRIANGLES;

	// Set canvas initial size
	this.stretch(width, height);

	this.locked = false;

	document.body.appendChild(this.canvas);

	return this;
};

/**
 * Creates a shader program from a vertex shader and a fragment shader.
 * NOTE: This function assumes that the shaders are GLSL files located the same folder.
 * 
 * @async
 * @param	{string}	folder	Shader folder relative path
 */
Renderer.prototype.loadProgram = async function(folder) {
	const
		gl = this.gl,
		vertexShader = await loadShader(gl, gl.VERTEX_SHADER, `${folder}/main.vert`),
		fragmentShader = await loadShader(gl, gl.FRAGMENT_SHADER, `${folder}/main.frag`),
		shaderProgram = gl.createProgram();

	if (vertexShader && fragmentShader) {
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) return console.error(
			"Unable to initialize the shader program ",
			gl.getProgramInfo(shaderProgram),
		);

		gl.shader = shaderProgram;
		parseShader(gl, vertexShader);
		parseShader(gl, fragmentShader);
		gl.useProgram(gl.shader);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.vertex);
		gl.vertexAttribPointer(gl.attribute.position, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(gl.attribute.position);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.buffer.index);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.color);
		gl.vertexAttribPointer(gl.attribute.color, 3, gl.UNSIGNED_BYTE, true, 0, 0);
		gl.enableVertexAttribArray(gl.attribute.color);
	}
};

Renderer.prototype.isLocked = function() {
	return this.canvas === document.pointerLockElement;
};

Renderer.prototype.lock = function() {
	this.canvas.requestPointerLock();
};

Renderer.prototype.render = function(scene, camera) {
	if (!this.gl.shader) return;

	this.gl.clearColor(...scene.background.hex1);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	let cameraTranslation = Matrix4.createTranslationMatrix(camera.position.multiply(camera.lhcs)),
		cameraRotationX = Matrix4.createRotationMatrix(camera.rotation.x, "x"),
		cameraRotationY = Matrix4.createRotationMatrix(camera.rotation.y, "y"),
		viewProjectionMatrix = camera.projectionMatrix
			.multiplyMatrix4(cameraRotationX)
			.multiplyMatrix4(cameraRotationY)
			.multiplyMatrix4(cameraTranslation);

	for (let mesh of scene.meshes) {
		if (!mesh.visible) continue;

		const geometry = mesh.geometry;

		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indices, this.gl.STATIC_DRAW);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.buffer.vertex);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, geometry.vertices, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.buffer.color);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.colors, this.gl.STATIC_DRAW);

		let scale = geometry.type === "plane" ? new Vector3(mesh.scale.x, 0, mesh.scale.y) : mesh.scale;

		let position = mesh.position.clone(),
			rotation = mesh.rotation.clone().invert();

		// Convert the client left-hand coordinate system (increase forward, decrease backward)
		// to a valid WebGL right-hand coordinate system (decrease forward, increase backward)
		position.set(position
			.multiply(camera.lhcs)
			.multiplyScalar(SCALE_MULTIPLIER)
			.invert()
		);

		let transform = viewProjectionMatrix
			.multiplyMatrix4(Matrix4.createTranslationMatrix(position))
			.multiplyMatrix4(Matrix4.createRotationMatrix(rotation.x, "x"))
			.multiplyMatrix4(Matrix4.createRotationMatrix(rotation.y, "y"))
			.multiplyMatrix4(Matrix4.createRotationMatrix(rotation.z, "z"))
			.multiplyMatrix4(Matrix4.createScaleMatrix(scale.multiplyScalar(SCALE_MULTIPLIER)));

		this.gl.uniformMatrix4fv(this.gl.uniform.transform, false, transform.data);
		this.gl.drawElements(this.primitiveType, geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
	}
};

Renderer.prototype.stretch = function(width = innerWidth, height = innerHeight) {
	this.width = width;
	this.height = height;

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.gl.viewport(0, 0, this.width, this.height);
};
import {Matrix4} from "../math/Matrix4.js";
import {Vector3} from "../math/Vector3.js";
import {loadTexture} from "../module.js";

export const renderMesh = (gl, mesh, camera, viewProjectionMatrix, primitiveType) => {
	if (!mesh.visible) return;

	const geometry = mesh.geometry; // Shortcut

	const
		p = mesh.position.multiply(camera.lhcs).invert(),
		r = mesh.rotation.invert(),
		s = geometry.type === "plane" ? new Vector3(mesh.scale.x, 0, mesh.scale.y) : mesh.scale,
		transform = viewProjectionMatrix
			.multiplyMatrix4(Matrix4.createTranslationMatrix(p))
			.multiplyMatrix4(Matrix4.createRotationMatrix(r.x, "x"))
			.multiplyMatrix4(Matrix4.createRotationMatrix(r.y, "y"))
			.multiplyMatrix4(Matrix4.createRotationMatrix(r.z, "z"))
			.multiplyMatrix4(Matrix4.createScaleMatrix(s));

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.vertex);
	gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.normal);
	gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

	gl.uniformMatrix4fv(gl.uniform.transform, false, transform.data);

	if (mesh.material.type === "color") {
		gl.uniform4fv(gl.uniform.color, mesh.material.color.hex1);
	} else {
		gl.uniform4fv(gl.uniform.color, gl.defaults.color);
	}

	if (mesh.material.type === "texture") {
		if (mesh.material.texture.loadState === 0) loadTexture(gl, mesh.material.texture);
		if (mesh.material.texture.loadState === 2) {
			gl.bindTexture(gl.TEXTURE_2D, mesh.material.texture.texture);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // Pixelated

			gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.uv);
			gl.bufferData(gl.ARRAY_BUFFER, mesh.geometry.uvs, gl.STATIC_DRAW);
		}
	} else {
		gl.bindTexture(gl.TEXTURE_2D, gl.defaults.texture);
	}

	gl.drawElements(primitiveType, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
};
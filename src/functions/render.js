import {Matrix4} from "../math/Matrix4.js";
import {Vector3} from "../math/Vector3.js";
import {loadTexture} from "../module.js";

export function render(scene, camera) {
	let gl = this.gl;

	if (!gl.shader) return;

	gl.clearColor(...scene.background.hex1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	let cameraPivot				= Matrix4.createTranslationMatrix(camera.distance.invert()),
		cameraTranslation		= Matrix4.createTranslationMatrix(camera.position.multiply(camera.lhcs)),
		cameraRotationX			= Matrix4.createRotationMatrix(-camera.rotation.x, "x"),
		cameraRotationY			= Matrix4.createRotationMatrix(camera.rotation.y, "y"),
		viewProjectionMatrix	= camera.projectionMatrix
			.multiplyMatrix4(cameraPivot)
			.multiplyMatrix4(cameraRotationX)
			.multiplyMatrix4(cameraRotationY)
			.multiplyMatrix4(cameraTranslation);

	for (let object of scene.objects) {
		if (!object.visible) continue;

		switch (object.type) {
			case "light": {
				switch (object.lightType) {
					case "ambient":
						gl.uniform1f(gl.uniform.ambientLight, object.intensity);

						break;
					case "directional":
						gl.uniform3fv(gl.uniform.reverseLightDir, object.direction.normalize().xyz());

						break;
				}

				break;
			}

			case "mesh": {
				const geometry = object.geometry;

				gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.vertex);
				gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);

				gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.normal);
				gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);

				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

				let p = object.position.multiply(camera.lhcs).invert(),
					r = object.rotation.invert(),
					s = geometry.type === "plane" ? new Vector3(object.scale.x, 0, object.scale.y) : object.scale,
					transform = viewProjectionMatrix
						.multiplyMatrix4(Matrix4.createTranslationMatrix(p))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.x, "x"))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.y, "y"))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.z, "z"))
						.multiplyMatrix4(Matrix4.createScaleMatrix(s));

				gl.uniformMatrix4fv(gl.uniform.transform, false, transform.data);

				if (object.material.type === "texture") {
					if (object.material.texture.loadState === 0) loadTexture(gl, object.material.texture);
					if (object.material.texture.loadState === 2) {
						gl.bindTexture(gl.TEXTURE_2D, object.material.texture.texture);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

						gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.uv);
						gl.bufferData(gl.ARRAY_BUFFER, object.geometry.uvs, gl.STATIC_DRAW);
					}
				}

				if (object.material.type === "color") gl.uniform4fv(gl.uniform.color, object.material.color.hex1);

				gl.drawElements(this.primitiveType, geometry.indices.length, gl.UNSIGNED_SHORT, 0);

				break;
			}
		}
	}
};
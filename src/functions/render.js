import {Matrix4} from "../math/Matrix4.js";
import {Vector3} from "../math/Vector3.js";
import {loadTexture} from "../module.js";

export function render(scene, camera) {
	if (!this.gl.shader) return;

	this.gl.clearColor(...scene.background.hex1);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

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
						this.gl.uniform1f(this.gl.uniform.ambientLight, object.intensity);

						break;
					case "directional":
						this.gl.uniform3fv(this.gl.uniform.reverseLightDir, object.direction.normalize().xyz());

						break;
				}

				break;
			}

			case "mesh": {
				const geometry = object.geometry;

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.buffer.vertex);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, geometry.vertices, this.gl.STATIC_DRAW);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.buffer.normal);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, geometry.normals, this.gl.STATIC_DRAW);

				this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indices, this.gl.STATIC_DRAW);

				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.buffer.uv);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, object.geometry.uvs, this.gl.STATIC_DRAW);

				let p = object.position.multiply(camera.lhcs).invert(),
					r = object.rotation.invert(),
					s = geometry.type === "plane" ? new Vector3(object.scale.x, 0, object.scale.y) : object.scale,
					transform = viewProjectionMatrix
						.multiplyMatrix4(Matrix4.createTranslationMatrix(p))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.x, "x"))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.y, "y"))
						.multiplyMatrix4(Matrix4.createRotationMatrix(r.z, "z"))
						.multiplyMatrix4(Matrix4.createScaleMatrix(s));

				this.gl.uniformMatrix4fv(this.gl.uniform.transform, false, transform.data);

				if (object.material.type === "texture") {
					if (object.material.texture.loadState === 0) loadTexture(this.gl, object.material.texture);
					if (object.material.texture.loadState === 2) {
						this.gl.bindTexture(this.gl.TEXTURE_2D, object.material.texture.texture);
					}
				}

				if (object.material.type === "color") this.gl.uniform4fv(this.gl.uniform.color, object.material.color.hex1);

				this.gl.drawElements(this.primitiveType, geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);

				break;
			}
		}
	}
};
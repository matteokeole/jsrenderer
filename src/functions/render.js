import {Matrix4} from "../math/Matrix4.js";
import {renderLight} from "./renderLight.js";
import {renderMesh} from "./renderMesh.js";

export default function(scene, camera) {
	this.gl.clearColor(...scene.background.hex1);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	const viewProjectionMatrix = camera.projectionMatrix
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.distance.invert())) // Pivot point
		.multiplyMatrix4(Matrix4.createRotationMatrix(-camera.rotation.x, "x")) // X rotation
		.multiplyMatrix4(Matrix4.createRotationMatrix(camera.rotation.y, "y")) // Y rotation
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.position.multiply(camera.lhcs))); // Translation

	for (const light of scene.lights) {
		renderLight(this.gl, light);
	}

	for (const mesh of scene.meshes) {
		renderMesh(this.gl, mesh, camera, viewProjectionMatrix, this.primitiveType);
	}
};
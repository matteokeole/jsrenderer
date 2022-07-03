export const renderLight = (gl, light) => {
	if (!light.visible) return;

	switch (light.lightType) {
		case "ambient":
			gl.uniform1f(gl.uniform.ambientLight, light.intensity);

			break;
		case "directional":
			gl.uniform3fv(gl.uniform.reverseLightDir, light.direction.normalize().xyz());

			break;
	}
};
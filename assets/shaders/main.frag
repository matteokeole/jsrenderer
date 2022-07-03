#version 300 es

precision highp float;

in vec2 v_uv;
in vec3 v_normal;

uniform vec4 u_color;
uniform float u_ambientLight;
uniform vec3 u_reverseLightDir;
uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
	vec3 normal = normalize(v_normal);

	float light = dot(normal, u_reverseLightDir);

	fragColor = u_color + texture(u_texture, v_uv);
	// fragColor = u_color;
	// fragColor.rgb *= light;
}
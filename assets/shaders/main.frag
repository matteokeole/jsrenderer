#version 300 es

precision highp float;

in vec3 v_normal;

uniform vec3 u_reverseLightDir;
uniform vec4 u_color;

out vec4 color;

void main() {
	vec3 normal = normalize(v_normal);

	float light = dot(normal, u_reverseLightDir);

	color = u_color;
	color.rgb *= light;
}
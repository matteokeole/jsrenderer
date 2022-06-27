#version 300 es

in vec4 a_position;
in vec2 a_uv;
in vec3 a_normal;

uniform mat4 u_transform;

out vec2 v_uv;
out vec3 v_normal;

void main() {
	gl_Position = u_transform * a_position;

	// Pass the texture UV to the fragment shader
	v_uv = a_uv;

	// Pass the normal to the fragment shader
	v_normal = a_normal;
}
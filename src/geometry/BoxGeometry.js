import {Vector3} from "../module.js";

export const BoxGeometry = function(width = 1, height = width, depth = width) {
	this.type = "box";

	this.width = width;
	this.height = height;
	this.depth = depth

	let w2 = this.width / 2,
		h2 = this.height / 2,
		d2 = this.depth / 2;

	/*this.vertices = new Float32Array([
		-w2,  h2,  d2,
		 w2,  h2,  d2,
		 w2, -h2,  d2,
		-w2, -h2,  d2,
		 w2,  h2, -d2,
		-w2,  h2, -d2,
		-w2, -h2, -d2,
		 w2, -h2, -d2,
	]);

	this.normals = new Float32Array([
		 0,  0, -1,   0,  0, -1,   0,  0, -1,		// back
		 0,  1,  0,   0,  1,  0,   0,  1,  0,		// up
		 0, -1,  0,   0, -1,  0,   0, -1,  0,		// down
		 0,  0,  1,   0,  0,  1,   0,  0,  1,		// front
		-1,  0,  0,  -1,  0,  0,  -1,  0,  0,		// left
		 1,  0,  0,   1,  0,  0,   1,  0,  0,		// right
	]);

	this.indices = new Uint16Array([
		0, 2, 1,
		2, 0, 3,
		4, 6, 5,
		6, 4, 7,
		5, 3, 0,
		3, 5, 6,
		1, 7, 4,
		7, 1, 2,
		5, 1, 4,
		1, 5, 0,
		3, 7, 2,
		7, 3, 6,
	]);*/

	this.vertices = new Float32Array([
     w2,  h2,  d2,		-w2,  h2,  d2,		-w2, -h2,  d2,		 w2, -h2,  d2,	// front
     w2,  h2,  d2,		 w2, -h2,  d2,		 w2, -h2, -d2,		 w2,  h2, -d2,	// right
     w2,  h2,  d2,		 w2,  h2, -d2,		-w2,  h2, -d2,		-w2,  h2,  d2,	// up
    -w2,  h2,  d2,		-w2,  h2, -d2,		-w2, -h2, -d2,		-w2, -h2,  d2,	// left
    -w2, -h2, -d2,		 w2, -h2, -d2,		 w2, -h2,  d2,		-w2, -h2,  d2,	// down
     w2, -h2, -d2,		-w2, -h2, -d2,		-w2,  h2, -d2,		 w2,  h2, -d2 	// back
  ]);

  this.normals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // back
  ]);

  this.indices = new Uint16Array([
    0, 1, 2,   0, 2, 3,  // front
    4, 5, 6,   4, 6, 7,  // right
    8, 9, 10,  8, 10,11, // up
    12,13,14,  12,14,15, // left
    16,17,18,  16,18,19, // down
    20,21,22,  20,22,23  // back
  ]);

	return this;
};
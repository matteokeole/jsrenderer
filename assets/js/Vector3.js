/**
 * Creates a 3-dimensional vector.
 * 
 * @constructor
 * @param	{number}	[x=0]
 * @param	{number}	[y=0]
 * @param	{number}	[z=0]
 * @returns	{Vector3}
 */
export default function Vector3(x = 0, y = 0, z = 0) {
	return this.set(x, y, z);
}

/**
 * Adds another vector to this vector.
 * 
 * @param	{Vector3}	v
 * @returns	self
 */
Vector3.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;

	return this;
};

/**
 * Adds a given scalar value to this vector's coordinates.
 * 
 * @param	{number}	s
 * @returns	self
 */
Vector3.prototype.addScalar = function(s) {
	this.x += s;
	this.y += s;
	this.z += s;

	return this;
};

/**
 * Adds the multiple of a given scalar value and a given vector to this vector.
 * 
 * @param	{Vector3}	v
 * @param	{number}	s
 * @returns	self
 */
Vector3.prototype.addScaledVector = function(v, s) {
	return this.add(v.multiplyScalar(s));
};

/**
 * Return the angle between this vector and another vector.
 * 
 * @param	{Vector3}	v 
 * @returns	{number}
 */
Vector3.prototype.angleTo = function(v) {
	const d = Math.sqrt(this.lengthSquared + v.lengthSquared());

	if (d === 0) return Math.PI / 2;

	const theta = this.dot(v) / denominator;

	return Math.acos(theta);
};

/**
 * Rounds up the position of this vector to the nearest integer value.
 * 
 * @returns	self
 */
Vector3.prototype.ceil = function() {
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
	this.z = Math.ceil(this.z);

	return this;
};

/**
 * Returns a copy of this vector.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.clone = function() {
	return new Vector3(this.x, this.y, this.z);
};

/**
 * Calculates the cross product of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	self
 */
Vector3.prototype.cross = function(v) {
	this.x = this.y * v.z - this.z * v.y;
	this.y = this.z * v.x - this.x * v.z;
	this.z = this.x * v.y - this.y * v.x;

	return this;
};

/**
 * Returns the distance between this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{number}
 */
Vector3.prototype.distanceTo = function(v) {
	return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2 + (v.z - this.z) ** 2);
};

/**
 * Divides this vector by another vector.
 * 
 * @param	{Vector3}	v
 * @returns	self
 */
Vector3.prototype.divide = function(v) {
	this.x /= v.x;
	this.y /= v.y;
	this.z /= v.z;

	return this;
};

/**
 * Divides this vector by a given scalar value.
 * 
 * @param	{number}	s
 * @returns	self
 */
Vector3.prototype.divideScalar = function(s) {
	return this.multiplyScalar(1 / s);
};

/**
 * Calculates the dot product of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{number}
 */
Vector3.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
 * Returns the boolean value of the comparison of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{boolean}
 */
Vector3.prototype.equals = function(v) {
	return this.x === v.x && this.y === v.y && this.z === v.z;
};

/**
 * Rounds down the position of this vector to the nearest integer value.
 * 
 * @returns	self
 */
Vector3.prototype.floor = function() {
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	this.z = Math.floor(this.z);

	return this;
};

/**
 * Inverts the coordinate signs of this vector.
 * 
 * @returns	self
 */
Vector3.prototype.invert = function() {
	return this.multiplyScalar(-1);
};

/**
 * Returns the length of the line going from the origin to the position of this vector.
 * 
 * @returns	{number}
 */
Vector3.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
};

/**
 * Returns the squared length of the line going from the origin to the position of this vector.
 * 
 * @returns	{number}
 */
Vector3.prototype.lengthSquared = function() {
	return this.x ** 2 + this.y ** 2 + this.z ** 2;
};

/**
 * Multiplies this vector by another vector.
 * 
 * @param	{Vector3}	v
 * @returns	self
 */
Vector3.prototype.multiply = function(v) {
	this.x *= v.x;
	this.y *= v.y;
	this.z *= v.z;

	return this;
};

/**
 * Multiplies this vector by a given scalar value.
 * 
 * @param	{number}	s
 * @returns	self
 */
Vector3.prototype.multiplyScalar = function(s) {
	this.x *= s;
	this.y *= s;
	this.z *= s;

	return this;
};

/**
 * Sets a pseudo-random position between 0 and 1 (excluded) for this vector.
 * 
 * @returns	self
 */
Vector3.prototype.random = function() {
	this.x = Math.random();
	this.y = Math.random();
	this.z = Math.random();

	return this;
};

/**
 * Rounds the position of this vector to the nearest integer value.
 * 
 * @returns	self
 */
Vector3.prototype.round = function() {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	this.z = Math.round(this.z);

	return this;
};

/**
 * Sets the coordinates of this vector.
 * 
 * @param	{number}	x
 * @param	{number}	y
 * @param	{number}	z
 * @returns	self
 */
Vector3.prototype.set = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	return this;
};

/**
 * Sets the X coordinate of this vector.
 * 
 * @param	{number}	x
 * @returns	self
 */
Vector3.prototype.setX = function(x) {
	this.x = x;

	return this;
};

/**
 * Sets the Y coordinate of this vector.
 * 
 * @param	{number}	y
 * @returns	self
 */
Vector3.prototype.setY = function(y) {
	this.y = y;

	return this;
};

/**
 * Sets the Z coordinate of this vector.
 * 
 * @param	{number}	z
 * @returns	self
 */
Vector3.prototype.setZ = function(z) {
	this.z = z;

	return this;
};

/**
 * Substracts this vector from another vector.
 * 
 * @param	{Vector3}	v
 * @returns	self
 */
Vector3.prototype.substract = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	this.z -= v.z;

	return this;
};

/**
 * Substract this vector from a given scalar value.
 * 
 * @param	{number}	s
 * @returns	self
 */
Vector3.prototype.substractScalar = function(s) {
	return this.addScalar(-s);
};

Vector3.prototype.toArray = function() {
	return [this.x, this.y, this.z];
};

Vector3.prototype.toString = function() {
	return `${this.x.toFixed(2)} / ${this.y.toFixed(2)} / ${this.z.toFixed(2)}`;
};
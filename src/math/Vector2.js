/**
 * Creates a 2-dimensional vector.
 * 
 * @constructor
 * @param	{number}	[x=0]
 * @param	{number}	[y=0]
 * @returns	{Vector2}
 */
 export const Vector2 = function(x = 0, y = 0) {
	return this.set(x, y);
};

// Randomizable constructor prototype
/*function Vector2(x_options = 0, y = 0) {
	if (typeof x_options === "object") {
		if (x_options.random) return this.randomize([0, innerWidth], [0, innerHeight]);
	}

	return this.set(x_options, y);
}
*/

/**
 * Sets the coordinates of this vector.
 * 
 * @param	{number}	x
 * @param	{number}	y
 * @returns	self
 */
Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;

	return this;
};
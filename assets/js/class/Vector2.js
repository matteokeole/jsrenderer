/**
 * Creates a 2-dimensional vector.
 * 
 * @constructor
 * @param	{number}	x
 * @param	{number}	y
 * @returns	{Vector2}
 */
export const Vector2 = function(x, y) {
	return this.set(x, y);
};

/**
 * Sets the coordinates of this vector.
 * 
 * @param	{number}	[x=0]
 * @param	{number}	[y=x]
 * @param	{number}	[z=x]
 * @returns	self
 */
Vector2.prototype.set = function(x = 0, y) {
	if (x instanceof Vector2) {
		this.x = x.x;
		this.y = x.y;

		return this;
	}

	if (y === undefined) {
		this.x = x;
		this.y = x;

		return this;
	}

	this.x = x;
	this.y = y;

	return this;
};
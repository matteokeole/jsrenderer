export const Matrix3 = function(m) {
	this.data = m;

	return this;
};

Matrix3.prototype.multiplyMatrix3 = function(m) {
	const
		i = this.data,
		j = m.data,
		a00 = i[0],   a10 = i[1],   a20 = i[2],
		a01 = i[3],   a11 = i[4],   a21 = i[5],
		a02 = i[6],   a12 = i[7],   a22 = i[8],
		b00 = j[0],   b10 = j[1],   b20 = j[2],
		b01 = j[3],   b11 = j[4],   b21 = j[5],
		b02 = j[6],   b12 = j[7],   b22 = j[8];

	return new Matrix3([
		a00 * b00 + a01 * b10 + a02 * b20,   a10 * b00 + a11 * b10 + a12 * b20,   a20 * b00 + a21 * b10 + a22 * b20,
		a00 * b01 + a01 * b11 + a02 * b21,   a10 * b01 + a11 * b11 + a12 * b21,   a20 * b01 + a21 * b11 + a22 * b21,
		a00 * b02 + a01 * b12 + a02 * b22,   a10 * b02 + a11 * b12 + a12 * b22,   a20 * b02 + a21 * b12 + a22 * b22,
	]);
};
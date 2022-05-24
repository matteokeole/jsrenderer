export default function() {
	this.position = [0, 0, 0];
	this.rotation = [0, 0, 0];

	this.place = (x, y, z) => this.position = [x, y, z];

	this.rotate = (x, y, z) => this.rotation = [x, y, z];

	this.move = (x, y, z) => {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	}
};
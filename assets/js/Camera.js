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

	this.moveForward = n => {
		// x1 = x + n * cos(theta)
		// (theta is the angle)
		let x = this.position[0] + n * Math.sin(this.rotation[1]),
			z = this.position[2] + n * Math.cos(this.rotation[1]);

		this.position[0] = x;
		this.position[2] = z;
	};

	this.moveRight = n => {
		let x = this.position[0] + n * Math.cos(this.rotation[1]),
			z = this.position[2] - n * Math.sin(this.rotation[1]);

		this.position[0] = x;
		this.position[2] = z;
	};
};
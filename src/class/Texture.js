export function Texture(src) {
	this.loadState = 0;
	this.src = src;
	this.image = new Image();

	return this;
};
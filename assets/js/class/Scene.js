export const Scene = function() {
	this.meshes = new Set();

	this.background = null;

	return this;
};

Scene.prototype.add = function(...meshes) {
	for (let mesh of meshes) this.meshes.add(mesh);
};

Scene.prototype.remove = function(...meshes) {
	for (let mesh of meshes) this.meshes.delete(mesh);
};
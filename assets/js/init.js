import Camera from "./Camera.js";
import BoxGeometry from "./BoxGeometry.js";

export const camera = new Camera();

export default () => {
	camera.place(0, 0, 0);

	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 6);
};
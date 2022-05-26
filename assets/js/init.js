import Camera from "./Camera.js";
import BoxGeometry from "./BoxGeometry.js";

export default () => {
	const camera = new Camera();

	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 6);
};
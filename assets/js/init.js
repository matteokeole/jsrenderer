import Camera from "./Camera.js";
import BoxGeometry from "./BoxGeometry.js";

export const camera = new Camera();

export default () => {
	camera.place(0, 0, 0);

	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 6);

	// const helper = new BoxGeometry(.3, .3, .3);
	// helper.place(0, 0, 0);
};
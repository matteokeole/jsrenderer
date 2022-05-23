import Camera from "./Camera.js";
import BoxGeometry from "./BoxGeometry.js";
// import PlaneGeometry from "./PlaneGeometry.js";

export const camera = new Camera();

export default () => {
	camera.place(0, 0, 0);
	camera.rotate(0, 0, 0);

	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 6);
};
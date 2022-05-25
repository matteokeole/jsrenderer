import Camera from "./Camera.js";
import BoxGeometry from "./BoxGeometry.js";

export default () => {
	const camera1 = new Camera();
	camera1.place(0, 0, 0);

	const camera2 = new Camera();
	camera2.place(4, 2, 2);
	camera2.rotate(-.22, -.74, 0);

	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 6);

	const helper1 = new BoxGeometry(.07, .07, .2);
	camera1.attach(helper1);
	helper1.place(.12, -.15, .27);
	helper1.rotate(-0.07, 0, Math.PI / 9);

	const helper2 = new BoxGeometry(.07, .07, .2);
	camera2.attach(helper2);
	helper2.place(.12, -.15, .27);
	helper2.rotate(-0.07, 0, Math.PI / 9);
};
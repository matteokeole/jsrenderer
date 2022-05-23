import BoxGeometry from "./BoxGeometry.js";
// import PlaneGeometry from "./PlaneGeometry.js";
import {SCREEN} from "./vars.js";

export default () => {
	const cube = new BoxGeometry(2, 2, 2);
	cube.place(0, 0, 5);
};
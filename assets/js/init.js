import BoxGeometry from "./BoxGeometry.js";
// import PlaneGeometry from "./PlaneGeometry.js";
import {SCREEN} from "./vars.js";

export default () => {
	const cube = new BoxGeometry(1, 2, 2, [-1, 0, -6]);
	const cube2 = new BoxGeometry(1, 2, 2, [1, 0, -6]);
};
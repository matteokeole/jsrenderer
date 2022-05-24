import {SCREEN, FIELD_OF_VIEW} from "./vars.js";

/**
 * Return in a 2-dimensional vertex the projection of the given 3-dimensional vertex.
 * X' = X / Z
 * Y' = Y / Z
 * @param	{array}	vertex	Vector to project
 */
export default vertex => [
	(vertex[0] / vertex[2]) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.WIDTH2,
	(vertex[1] / vertex[2]) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.HEIGHT2,
];
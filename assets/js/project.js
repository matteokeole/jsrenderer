import {SCREEN, FIELD_OF_VIEW} from "./vars.js";

/**
 * Return in a 2-dimensional vector the projection of the given 3-dimensional vector.
 * X' = X / Z
 * Y' = Y / Z
 * @param	{array}	vector	Vector to project
 */
export default vector => [
	(vector[0] / vector[2]) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.WIDTH2,
	(vector[1] / vector[2]) / FIELD_OF_VIEW * SCREEN.WIDTH2 + SCREEN.HEIGHT2,
];
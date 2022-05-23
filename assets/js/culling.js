/**
 * Basic back-face culling implementation.
 * If the return is negative or null, the face doesn't need to be drawn.
 * @param	{array}	p0	First point coordinates
 * @param	{array}	p1	Second point coordinates
 * @param	{array}	p2	Third point coordinates
 */
export default (p0, p1, p2) =>
	(p1[0] - p0[0]) * (p2[1] - p0[1]) -
	(p2[0] - p0[0]) * (p1[1] - p0[1]);
import {Viewport} from "./vars.js";

export default () => {
	// Update screen size variables
	Viewport.width		= innerWidth;
	Viewport.height		= innerHeight;
	Viewport.midWidth	= Viewport.width / 2;
	Viewport.midHeight	= Viewport.height / 2;
};
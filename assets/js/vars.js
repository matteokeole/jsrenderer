export const
	Viewport = {
		/**
		 * @constant Maximum screen width
		 */
		maxWidth: screen.width,
		/**
		 * @constant Maximum screen height
		 */
		maxHeight: screen.height,
		width: innerWidth,			// Current page width
		height: innerHeight,		// Current page height
		midWidth: innerWidth / 2,	// Current page half width
		midHeight: innerHeight / 2,	// Current page half height
	},
	SENSITIVITY = 1.2,
	/**
	 * @constant Desired number of frames per second
	 */
	FRAMES_PER_SECOND	= 60,
	FRAMERATE			= 165 / FRAMES_PER_SECOND,
	VELOCITY			= FRAMERATE / 30,
	Keybind				= {
		forward:	"KeyW",
		backward:	"KeyS",
		left:		"KeyA",
		right:		"KeyD",
		ascend:		"Space",
		descend:	"ControlLeft",
		nextCamera:	"F1",
	};
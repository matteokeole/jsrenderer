export const
	Viewport = {
		maxWidth:	screen.width,		// Full screen width
		maxHeight:	screen.height,		// Full screen height
		width:		innerWidth,			// Page width
		height:		innerHeight,		// Page height
		midWidth:	innerWidth / 2,		// Page half width
		midHeight:	innerHeight / 2,	// Page half height
	},
	FRAMES_PER_SECOND = 60,
	FRAMERATE = 165 / FRAMES_PER_SECOND,
	SENSITIVITY = 1.2,
	VELOCITY = FRAMERATE / 30,
	Keybind = {
		forward:	"KeyW",
		backward:	"KeyS",
		left:		"KeyA",
		right:		"KeyD",
		ascend:		"Space",
		descend:	"ControlLeft",
		nextCamera:	"F1",
	};
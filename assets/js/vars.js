export const
	SCREEN				= {
		MAX_WIDTH:	screen.width,		// Maximum screen width
		MAX_HEIGHT:	screen.height,		// Maximum screen height
		WIDTH:		innerWidth,			// Current page width
		HEIGHT:		innerHeight,		// Current page height
		WIDTH2:		innerWidth / 2,		// Current page half width
		HEIGHT2:	innerHeight / 2,	// Current page half height
	},
	FRAMES_PER_SECOND	= 60,
	FRAMERATE			= 165 / FRAMES_PER_SECOND,
	VELOCITY			= FRAMERATE / 30,
	Keybind				= {
		forward:	"KeyW",
		backward:	"KeyS",
		left:		"KeyA",
		right:		"KeyD",
	};
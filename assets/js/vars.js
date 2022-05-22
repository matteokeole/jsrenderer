export const
	SCREEN				= {
		MAX_WIDTH:	screen.width,		// Maximum screen width
		MAX_HEIGHT:	screen.height,		// Maximum screen height
		WIDTH:		innerWidth,			// Current browser page width
		HEIGHT:		innerHeight,		// Current browser page height
		WIDTH2:		innerWidth / 2,		// Current browser page half width
		HEIGHT2:	innerHeight / 2,	// Current browser page half height
	},
	FRAMES_PER_SECOND	= 60,
	FRAMERATE			= 165 / FRAMES_PER_SECOND,
	VELOCITY			= FRAMERATE / 30,
	Keybind				= {
		walk_forward:	"KeyW",
		walk_backward:	"KeyS",
		walk_left:		"KeyA",
		walk_right:		"KeyD",
	};
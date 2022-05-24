export const
	SCREEN				= {
		MAX_WIDTH:		screen.width,				// Maximum screen width
		MAX_HEIGHT:		screen.height,				// Maximum screen height
		WIDTH:			innerWidth,					// Current page width
		HEIGHT:			innerHeight,				// Current page height
		get WIDTH2()	{return this.WIDTH / 2},	// Current page half width
		get HEIGHT2()	{return this.HEIGHT / 2},	// Current page half height
	},
	FIELD_OF_VIEW		= 1,
	FRAMES_PER_SECOND	= 60,
	FRAMERATE			= 165 / FRAMES_PER_SECOND,
	VELOCITY			= FRAMERATE / 30,
	Keybind				= {
		forward:	"KeyW",
		backward:	"KeyS",
		left:		"KeyA",
		right:		"KeyD",
	};
export const
	keys = new Set(),
	key_press = e => keys.add(e.code),
	key_release = e => keys.delete(e.code);
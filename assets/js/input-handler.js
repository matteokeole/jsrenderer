export const
	keys = new Set(),
	key_down = e => keys.add(e.code),
	key_up = e => keys.delete(e.code);
export const
	keys = new Set(),
	pressKeys = e => keys.add(e.code),
	releaseKeys = e => keys.delete(e.code);
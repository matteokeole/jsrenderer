/**
 * Generates a random UUID using the Crypto API.
 * 
 * @generator
 * @yields {string}
 */
export function* generator() {
	while (true) yield crypto.randomUUID();
};
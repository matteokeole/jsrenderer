/**
 * Generates a random UUID using the Crypto API.
 * 
 * @generator
 * @yields {string}
 */
export default function* () {
	while (true) yield crypto.randomUUID();
};
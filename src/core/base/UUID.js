import {generator} from "../../modules/uuid/index.js";

/**
 * Appends a generated UUID to a new object.
 * 
 * @constructor
 */
export function UUID() {
	this.uuid = uuid.next().value;
};

const uuid = generator();
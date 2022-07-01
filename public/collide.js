import {player, wall} from "./main.js";

export default () => {
	if (player.position.z + player.geometry.width / 2 >= wall.position.z) console.log("colliding")
};
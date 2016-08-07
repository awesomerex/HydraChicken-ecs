"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	if (!game.entities.get(8, "disabled")) {
		game.switchScene("title");
	}
	console.log("test");
	game.entities.set(8, "disabled", false);
};

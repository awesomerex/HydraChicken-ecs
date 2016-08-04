"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var levelManager = 13;
	game.entities.set(levelManager, "currentStage", "beetle");
	game.entities.set(levelManager, "matchedCount", 0);
	game.entities.set(levelManager, "unmatchedCount", 0);
	game.entities.set(levelManager, "score", 0);
	game.entities.set(levelManager, "ending", "");

};

"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	if (game.entities.find("leftHeadAttack").length > 0) {
		return;
	}
	var idle = game.entities.find("leftHeadIdle");
	for (var x = 0; x < idle.length; x++) {
		game.entities.destroy(idle[x]);
	}

	game.instantiatePrefab("left-head-attack");
};

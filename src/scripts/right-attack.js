"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	if (game.entities.find("rightHeadAttack").length > 0) {
		return;
	}
	var idle = game.entities.find("rightHeadIdle");
	for (var x = 0; x < idle.length; x++) {
		game.entities.destroy(idle[x]);
	}

	game.instantiatePrefab("right-head-attack");
};

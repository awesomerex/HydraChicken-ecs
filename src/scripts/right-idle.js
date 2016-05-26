"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

	var attack = game.entities.find("rightHeadAttack");
	for (var x = 0; x < attack.length; x++) {
		game.entities.destroy(attack[x]);
	}

	var idle = game.instantiatePrefab("right-head");
	var animation = game.entities.get(idle, "animation");
	var body = 3;
	var bodyAnimation = game.entities.get(body, "animation");

	animation.frame = bodyAnimation.frame;
	animation.time  = bodyAnimation.time;
};

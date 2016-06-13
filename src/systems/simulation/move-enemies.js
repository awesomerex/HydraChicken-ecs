"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var direction = game.entities.get(entity, "direction");

		//check if enemy is off of the screen
		if (position.x < -20 || position.x > 1156) {
			game.entities.destroy(entity);
		}

		if (direction === "right") {
			position.x += 2;
		}

		if (direction === "left") {
			position.x -= 2;
		}

	}, "enemy");
};

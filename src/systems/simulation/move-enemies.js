"use strict";

function collisionCheck(attackPosition, enemyPosition) {
	if (enemyPosition.x > attackPosition.x && enemyPosition.x < attackPosition.x + attackPosition.width) {
		return true;
	} else {
		return false;
	}
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var direction = game.entities.get(entity, "direction");
		var leftHead = game.entities.find("leftHeadAttack");
		var rightHead = game.entities.find("rightHeadAttack");
		var lhPos = undefined;
		var rhPos = undefined;
		var lhEating, rhEating;

		if (leftHead.length > 0) {
			lhPos = game.entities.get(leftHead, "position");
		}
		if (rightHead.length > 0) {
			rhPos = game.entities.get(rightHead, "position");
		}

		//check collisions between enemies and attacking heads
		if (lhPos != undefined) {
			lhEating = game.entities.get(leftHead, "notEating");
			var lhAnimation = game.entities.get(leftHead, "animation");
			if (collisionCheck(lhPos, position) && lhEating && lhAnimation.frame === 0) {
				game.entities.set(leftHead, "notEating", false);
				game.entities.set(entity, "eaten", true);
				game.entities.set(entity, "devouredBy", "left");
			}
		}

		if (rhPos != undefined) {
			rhEating = game.entities.get(rightHead, "notEating");
			var rhAnimation = game.entities.get(rightHead, "animation");
			if (collisionCheck(rhPos, position) && rhEating && rhAnimation.frame === 0) {
				game.entities.set(rightHead, "notEating", false);
				game.entities.set(entity, "eaten", true);
				game.entities.set(entity, "devouredBy", "right");
			}
		}


		//check if enemy has been eaten
		if (game.entities.get(entity, "eaten") != undefined) {
			game.entities.set(entity, "destroy", true);
			return;
		}

		//check if enemy is off of the screen
		if (position.x < -20 || position.x > 1156) {
			game.entities.set(entity, "destroy", true);
			game.sounds.stop(game.entities.get(entity, "sound") + entity);
			return; //
		}


		//move enemy
		if (direction === "right") {
			position.x += 2;
		}

		if (direction === "left") {
			position.x -= 2;
		}

	}, "enemy");
};

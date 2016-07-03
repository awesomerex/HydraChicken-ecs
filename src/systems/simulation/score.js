"use strict";

var devour = function(enemy, manager, head, game) {
	if (enemy.color === "red") {
		manager.redCount++;
		if (head === "left") {
			manager.matchedCount ++;
			manager.enemyType ++;
		}
		if (head === "right") {
			manager.unmatchedCount ++;
			manager.enemyType --;
		}
	}
	if (enemy.color === "blue") {
		manager.blueCount++;
		if (head === "left") {
			manager.unmatchedCount ++;
			manager.enemyType --;
		}
		if (head === "right") {
			manager.matchedCount ++;
			manager.enemyType ++;
		}
	}
	manager.calcTotal();
	manager.setStage(game);
	manager.calcScore();
	if (manager.total % 20 === 0) {
		//new level
		//clear old enemies
		// scene.enemies = [];
		// scene.chickenBody.reset();
		// game.sounds.play("grow_cluck");
		// game.sounds.play("grow_sound");
	}

	if (manager.total % 20 === 10) {
		//half way through level
		// scene.chickenBody.morph();
	}

	//console.log(manager);
};

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var color, head;
		color = game.entities.get(entity, "color");
		head = game.entities.get(entity, "devouredBy");
		devour({ "color": color }, game.manager, head, game);
		console.log(game.manager.total);
	}, "eaten");
};

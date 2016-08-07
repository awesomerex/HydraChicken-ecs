"use strict";

function getScoreValue(enemyType) {
	var pointValue;

	switch (enemyType) {
	case "beetle":
		pointValue = 25;
		break;
	case "rat":
		pointValue = 50;
		break;
	case "sheep":
		pointValue = 100;
		break;
	case "pony":
		pointValue = 200;
		break;
	case "elephant":
		pointValue = 400;
		break;
	default:
		pointValue = NaN;
		break;
	}
	return pointValue;
}

var devour = function(enemy, manager, head, game) {
	var matchedCount, unmatchedCount;
	matchedCount = game.entities.get(13, "matchedCount");
	unmatchedCount = game.entities.get(13, "unmatchedCount");
	if (enemy.color === "red") {
		manager.redCount++;
		if (head === "left") {
			matchedCount++;
			manager.enemyType++;
		}
		if (head === "right") {
			unmatchedCount++;
			manager.enemyType--;
		}
	}
	if (enemy.color === "blue") {
		manager.blueCount++;
		if (head === "left") {
			unmatchedCount++;
			manager.enemyType--;
		}
		if (head === "right") {
			matchedCount++;
			manager.enemyType++;
		}
	}
	game.entities.set(13, "matchedCount", matchedCount);
	game.entities.set(13, "unmatchedCount", unmatchedCount);
	manager.calcTotal();
	manager.calcScore();
	manager.setStage(game);

	if (manager.total % 20 === 0) {
		//new level
		//clear old enemies
		var enemies = game.entities.find("enemy");
		for (var x = 0; x < enemies.length; x++) {
			game.entities.set(enemies[x], "destroy", true);
			game.sounds.stop(game.entities.get(enemies[x], "sound") + enemies[x]);
		}
		// scene.chickenBody.reset();
		game.sounds.play("Grow_time_cluck.mp3");
		game.sounds.play("Grow_time_sound.mp3");
	}

	if (manager.total % 20 === 10) {
		//half way through level
		// scene.chickenBody.morph();
	}

	//console.log(manager);
};

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var color, head, score, scoreText, enemyType;

		enemyType = game.entities.get(entity, "enemyType");
		color = game.entities.get(entity, "color");
		head = game.entities.get(entity, "devouredBy");
		score = game.entities.get(15, "score") + getScoreValue(enemyType);
		game.entities.set(15, "score", score);
		scoreText = game.entities.get(15, "text");
		scoreText.text = "Score: " + score;
		devour({ "color": color }, game.manager, head, game);
		game.sounds.stop(game.entities.get(entity, "sound") + entity);
	}, "eaten");
};

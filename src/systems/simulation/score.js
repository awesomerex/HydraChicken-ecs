"use strict";

	var manager = {
		total: 0,
		redCount: 0,
		blueCount: 0,
		matchedCount: 0,
		unmatchedCount: 0,
		beetle: 0,
		rat: 0,
		sheep: 0,
		pony: 0,
		elephant: 0,
		ending: "",
		score: 0
	};

	manager.reset = function(){
		this.total = 0,
		this.redCount = 0,
		this.blueCount = 0,
		this.matchedCount = 0,
		this.unmatchedCount = 0,
		this.beetle = 0,
		this.rat = 0,
		this.sheep = 0,
		this.pony = 0,
		this.elephant = 0,
		this.ending = "",
		this.score = 0

	};
	
	function getMatchedCount(game){
		return game.entities.get(13, "matchedCount");
	}

	function getUnmatchedCount(game){
		return game.entities.get(13, "unmatchedCount");
	}

	function getEnding(game){
		return game.entities.get(13, "ending");
	}

	function setMatchedCount(game, value){
		game.entities.set(13, "matchedCount", value);
	}

	function setUnmatchedCount(game, value){
		game.entities.set(13, "unmatchedCount", value);
	}

	function setEnding(game, value){
		game.entities.set(13, "ending", value);
	}

	manager.calcTotal = function() {
		this.total = this.redCount + this.blueCount;
	};
	manager.calcEnding = function(game) {
		var matchedCount, unmatchedCount;
		matchedCount = getMatchedCount(game);
		unmatchedCount = getUnmatchedCount(game);
		if (matchedCount > unmatchedCount) {
			this.ending = "Phoenix_Finish.jpg";
		}
		if (matchedCount < unmatchedCount) {
			this.ending = "Dragon_Finish.jpg";
		}
		if (matchedCount === unmatchedCount) {
			this.ending = "Zen_Finish.jpg";
		}
		game.sounds.stop("Tale_of_the_Hydra_Chicken.mp3");
		game.switchScene("ending", { "ending": this.ending,
						 			 "matchedCount": getMatchedCount(game),
									 "unmatchedCount": getUnmatchedCount(game),
									 "score": game.entities.get(15, "score"),
									 "manager" : manager 
									});
	};

	manager.calcScore = function() {
		var matchedTotal = this.matchedCount * 100;
		var unmatchedTotal = this.unmatchedCount * -100;
		this.score = matchedTotal + unmatchedTotal;
	};

	manager.setStage = function(game) {
		if (this.total >= 20 && this.total < 40) {
			this.calcEnding(game);
			game.entities.set(13, "currentStage", "rat");
			game.entities.set(2, "image", { "name": "Background_rat_level.jpg" });
		}
		if (this.total >= 40 && this.total < 60) {
			game.entities.set(13, "currentStage", "sheep");
			game.entities.set(2, "image", { "name": "Background_sheep_level.jpg" });
		}
		if (this.total >= 60 && this.total < 80) {
			game.entities.set(13, "currentStage", "pony");
			game.entities.set(2, "image", { "name": "Background_pony_level.jpg" });
		}
		if (this.total >= 80) {
			game.entities.set(13, "currentStage", "elephant");
			game.entities.set(2, "image", { "name": "Background_elephant_level.jpg" });
		}
		if (this.total >= 100) {
			game.sounds.stop("Tale_of_the_Hydra_Chicken.mp3");
			this.calcEnding(game);
			//game.switchScene("ending", { "ending": this.ending, "matchedCount": this.matchedCount, "unmatchedCount": this.unmatchedCount });
		}
	};

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

	console.log(manager.total, game.entities.find("enemy"));
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
		devour({ "color": color }, manager, head, game);
		game.sounds.stop(game.entities.get(entity, "sound") + entity);
	}, "eaten");
};

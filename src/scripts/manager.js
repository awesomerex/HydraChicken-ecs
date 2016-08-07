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

manager.reset = function() {
	this.total = 0;
	this.redCount = 0;
	this.blueCount = 0;
	this.matchedCount = 0;
	this.unmatchedCount = 0;
	this.beetle = 0;
	this.rat = 0;
	this.sheep = 0;
	this.pony = 0;
	this.elephant = 0;
	this.ending = "";
	this.score = 0;
};

function getMatchedCount(game) {
	return game.entities.get(13, "matchedCount");
}

function getUnmatchedCount(game) {
	return game.entities.get(13, "unmatchedCount");
}

function getEnding(game) { // eslint-disable-line no-unused-vars
	return game.entities.get(13, "ending");
}

function setMatchedCount(game, value) { // eslint-disable-line no-unused-vars
	game.entities.set(13, "matchedCount", value);
}

function setUnmatchedCount(game, value) { // eslint-disable-line no-unused-vars
	game.entities.set(13, "unmatchedCount", value);
}

function setEnding(game, value) { // eslint-disable-line no-unused-vars
	game.entities.set(13, "ending", value);
}

manager.calcTotal = function() {
	this.total = this.redCount + this.blueCount;
};
manager.calcEnding = function(game) {
	var matchedCount, unmatchedCount, score;
	score = game.entities.get(15, "score");
	matchedCount = getMatchedCount(game);
	unmatchedCount = getUnmatchedCount(game);
	if (score < 600) {
		this.ending = "Loss_Finish.jpg";
	} else {
		if (matchedCount > unmatchedCount) {
			this.ending = "Phoenix_Finish.jpg";
		}
		if (matchedCount < unmatchedCount) {
			this.ending = "Dragon_Finish.jpg";
		}
		if (matchedCount === unmatchedCount) {
			this.ending = "Zen_Finish.jpg";
		}
	}
	game.sounds.stop("Tale_of_the_Hydra_Chicken.mp3");
	game.switchScene("ending", { "ending": this.ending,
								"matchedCount": getMatchedCount(game),
								"unmatchedCount": getUnmatchedCount(game),
								"score": game.entities.get(15, "score"),
								"manager": manager
								});
};

manager.calcScore = function() {
	var matchedTotal = this.matchedCount * 100;
	var unmatchedTotal = this.unmatchedCount * -100;
	this.score = matchedTotal + unmatchedTotal;
};

manager.setStage = function(game) {
	if (this.total >= 20 && this.total < 40) {
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
		//no limit to the number of critters you can eat
		//game.switchScene("ending", { "ending": this.ending, "matchedCount": this.matchedCount, "unmatchedCount": this.unmatchedCount });
	}
};



module.exports = manager;

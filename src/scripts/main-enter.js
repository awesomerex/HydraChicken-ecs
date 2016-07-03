"use strict";

function generateScoreManager() {
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
	manager.calcTotal = function() {
		this.total = this.redCount + this.blueCount;
	};
	manager.calcEnding = function() {
		if (this.matchedCount > this.unmatchedCount) {
			this.ending = "phoenix";
		}
		if (this.matchedCount < this.unmatchedCount) {
			this.ending = "dragon";
		}
		if (this.score === 0) {
			this.ending = "zen";
		}
	};

	manager.calcScore = function() {
		var matchedTotal = this.matchedCount * 100;
		var unmatchedTotal = this.unmatchedCount * -100;
		this.score = matchedTotal + unmatchedTotal;
	};

	manager.setStage = function(game) {
		if (this.total >= 20 && this.total < 40) {
			game.entities.set(13, "currentStage", "rat");
			// scene.bgimage.sprite = game.animations.get("bg-2");
		}
		if (this.total >= 40 && this.total < 60) {
			// game.sounds.stop("rat");
			game.entities.set(13, "currentStage", "sheep");
			// scene.bgimage.sprite = game.animations.get("bg-3");
		}
		if (this.total >= 60 && this.total < 80) {
			// game.sounds.stop("sheep");
			game.entities.set(13, "currentStage", "pony");
			// scene.bgimage.sprite = game.animations.get("bg-4");
		}
		if (this.total >= 80) {
			// game.sounds.stop("pony");
			game.entities.set(13, "currentStage", "elephant");
			// scene.bgimage.sprite = game.animations.get("bg-5");
		}
		if (this.total >= 100) {
			// game.sounds.stop("bgm1");
			// game.sounds.stop("elephant");
			game.scenes.switchTo("credits");
		}
	};

	return manager;
}

module.exports = function(game) { // eslint-disable-line no-unused-vars
	game.scaleCanvasToFitRectangle(1136, 640);
	game.instantiatePrefab("left-head");
	game.instantiatePrefab("right-head");
	game.manager = generateScoreManager();
};

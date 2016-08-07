"use strict";

function secondsToTimeRemaining(seconds) {
	var minutes, remainingSeconds;
	minutes = Math.floor(seconds / 60);
	remainingSeconds = seconds - minutes * 60;
	if (remainingSeconds < 10) {
		remainingSeconds = "0" + remainingSeconds;
	}

	return minutes + ":" + remainingSeconds;
}


module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	var timeLimit, currentTime, text;

	timeLimit = game.entities.find("timeLimit");
	currentTime = game.entities.get(timeLimit, "timeLimit");

	if (currentTime - 1 === 0) {
		game.manager.calcEnding(game);
	}

	game.entities.set(timeLimit, "timeLimit", currentTime -= 1);
	text = game.entities.get(timeLimit, "text");
	text.text = "Time: " + secondsToTimeRemaining(currentTime);
	game.entities.set(timeLimit, "text", text);


	var timers = game.entities.get(entity,"timers");
	timers.timeLimit.running = true;

};

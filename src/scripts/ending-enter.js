"use strict";

function setUpScene(game, args) {
	var score, matchedCount, unmatchedCount, ending;
	game.entities.set(2, "image", { "name": game.arguments.ending });

	score = game.entities.get(3, "text");
	score.text = "Score: " + args.score;

	matchedCount = game.entities.get(4, "text");
	matchedCount.text = "Matched Count: " + args.matchedCount;
	game.entities.set(4, "text", matchedCount);

	unmatchedCount = game.entities.get(5, "text");
	unmatchedCount.text = "Mis-matched Count: " + args.unmatchedCount;
	game.entities.set(5, "text", unmatchedCount);

	ending = game.entities.get(6, "text");
	ending.text = "Ending: " + args.ending;
	game.entities.set(6, "text", ending);
}

module.exports = function(game) { // eslint-disable-line no-unused-vars
	game.scaleCanvasToFitRectangle(1136, 640);
	console.log("manager", game.arguments);
	setUpScene(game, game.arguments);

};

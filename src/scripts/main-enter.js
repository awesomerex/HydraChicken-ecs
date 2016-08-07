"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	game.manager = require("./manager.js");
	game.sounds.play("Tale_of_the_Hydra_Chicken.mp3", true);
	game.scaleCanvasToFitRectangle(1136, 640);
	game.instantiatePrefab("left-head");
	game.instantiatePrefab("right-head");
};

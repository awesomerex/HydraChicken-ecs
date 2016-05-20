"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("frameSearch", ["animation", "onFrame"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var animation = game.entities.get(entity, "animation");
		var onFrame = game.entities.get(entity, "onFrame");

		if (animation.frame === onFrame.frame) {
			var script = game.require(onFrame.script);
			script(entity, game);
		}

	}, "frameSearch");
};

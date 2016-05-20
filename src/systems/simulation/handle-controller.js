"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var controller = game.entities.get(entity, "controller");
		var keys = Object.keys(controller);

		//call script and run it.
		for (var x = 0; x < keys.length; x++) {
			if (game.inputs.buttonPressed(keys[x])) {
				var script = game.require(controller[keys[x]]);
				script(entity, game);
			}
		}

	}, "controller");
};

"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("textSearch", ["position", "text"]);
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var text = game.entities.get(entity, "text");
		var position = game.entities.get(entity, "position");
		game.context.fillStyle = text.fillStyle;
		game.context.font = text.font;
		game.context.fillText(text.text, position.x , position.y);

	}, "textSearch");
};

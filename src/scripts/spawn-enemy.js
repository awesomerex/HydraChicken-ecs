"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

	var spawner = game.entities.find("spawner");
	var currentLevel = game.entities.get(spawner, "level");
	var direction = game.entities.get(spawner, "direction");
	var spawnerPosition = game.entities.get(spawner, "position");

console.log(spawner, spawnerPosition);

	var level = ["beetle", "rat", "sheep", "pony", "elephant"];
	var colors = ["red", "blue"];

	//determine which prefab we're generating

	var critter = game.instantiatePrefab("beetle-blue");

	var critterPos = game.entities.get(critter, "position");
	var critterImage = game.entities.get(critter, "image");

	critterPos.x = spawnerPosition.x;
	critterPos.y = spawnerPosition.y;
	console.log(critterPos);

};

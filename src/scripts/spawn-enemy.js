"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

	var spawners = game.entities.find("spawner");
	//2 spawners pick one at random
	//var random = Math.floor(Math.random() * spawners.length);
	console.log("spawners:",spawners[0]);
	var spawner = spawners[Math.floor(Math.random() * spawners.length)];

	//var currentLevel = game.entities.get(spawner, "level");
	var direction = game.entities.get(spawner, "spawner").direction;
	console.log(spawner);
	var spawnerPosition = game.entities.get(spawner, "position");

	console.log(spawner, spawnerPosition);

	var level = ["beetle", "rat", "sheep", "pony", "elephant"];
	var colors = ["red", "blue"];

	//determine which prefab we're generating
	var color = colors[Math.floor(Math.random() * colors.length)];
	console.log("got here", color, direction);
	var critter = game.instantiatePrefab("elephant-" + color + "-" + direction);
	console.log("got sheep");
	game.entities.set(critter, "direction",direction);
	console.log(direction);
	// console.log(critterDirection);
	// critterDirection = direction;

	var critterPos = game.entities.get(critter, "position");

	critterPos.x = spawnerPosition.x;
	critterPos.y = spawnerPosition.y;
	console.log(critterPos);

};

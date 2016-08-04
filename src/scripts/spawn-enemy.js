"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

	var spawners = game.entities.find("spawner");
	var spawner = spawners[Math.floor(Math.random() * spawners.length)];

	var direction = game.entities.get(spawner, "spawner").direction;
	var spawnerPosition = game.entities.get(spawner, "position");

	// var level = ["beetle", "rat", "sheep", "pony", "elephant"];
	var levelManager = game.entities.find("levelManager");
	var level = game.entities.get(levelManager, "currentStage");
	var colors = ["red", "blue"];

	//determine which prefab we're generating
	var color = colors[Math.floor(Math.random() * colors.length)];
	var critter = game.instantiatePrefab(level + "-" + color + "-" + direction);
	game.entities.set(critter, "direction",direction);
	game.entities.set(critter, "color", color);
	game.entities.set(critter, "devouredBy", "");
	game.entities.set(critter, "mod", "");

	var critterPos = game.entities.get(critter, "position");

	critterPos.x = spawnerPosition.x;
	critterPos.y = spawnerPosition.y;

	var sound = game.entities.get(critter, "sound");
	if (sound != undefined) {
		game.sounds.play(sound, false, critter);
	}


	var timers = game.entities.get(entity,"timers");
	timers.spawnEnemy.running = true;

};

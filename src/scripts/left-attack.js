"use strict";

var attackSounds = ["attack_voice1.mp3","attack_voice2.mp3","attack_voice3.mp3","attack_voice4.mp3","attack_voice5.mp3","attack_voice6.mp3"];

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	if (game.entities.find("leftHeadAttack").length > 0) {
		return;
	}
	var idle = game.entities.find("leftHeadIdle");
	for (var x = 0; x < idle.length; x++) {
		game.entities.destroy(idle[x]);
	}

	game.instantiatePrefab("left-head-attack");
	game.sounds.play(attackSounds[Math.floor(Math.random() * attackSounds.length)]);
	game.sounds.play("Beak_Peck_Impact.mp3");
};

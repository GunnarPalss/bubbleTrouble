/*

entityManager.js

A module which handles arbitrary entity-management for "Bubble Trouble"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";



var entityManager = {

// "PRIVATE" DATA

_bubbles   : [],
_WiresPlayerOne : [],
_WiresPlayerTwo: [],
_players   : [],
_powerUps : [],

_bShowBubbles : true,

// "PRIVATE" METHODS


_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bubbles, this._WiresPlayerOne, this._WiresPlayerTwo, this._players, this._powerUps];
},

//initialize entities (level 1)
init: function() {

    this.generateBubble({
		cx: g_canvas.width/2,
		cy: g_canvas.height*0.1
	});

    this.generatePlayer({
        cx : 200,
        cy : 200,
        lives : 3,
        playerIndex: 0,
        sprite: g_sprites.player,
        KEY_LEFT: 'A'.charCodeAt(0),
		KEY_RIGHT: 'D'.charCodeAt(0),
		KEY_FIRE: ' '.charCodeAt(0)

    });

    if(gameManager.twoPlayer) {
    	this.generatePlayer({
    		cx: 400,
    		cy: 200,
    		lives: 3,
    		playerIndex: 1,
    		sprite: g_sprites.player2,
    		KEY_LEFT: 37,
			KEY_RIGHT: 39,
			KEY_FIRE: 38

    	});
	}
},

fireWire: function(cx , player) {


	if(player.playerIndex === 0)
		var wires = this._WiresPlayerOne;
	else
		var wires = this._WiresPlayerTwo;


	var minWireNumber = 0;
	if (powerUpEffectManager.double.active)
		minWireNumber = 1;

	if(powerUpEffectManager.freeze.active && wires.length <= minWireNumber)
	{

		 wires.push(new Wire({
	        cx   : cx,
	        velY : -10
	    }));
	}

	//Ensure that you can only fire one wire at a time
	else if(wires.length <= minWireNumber)
	{

	    wires.push(new Wire({
	        cx   : cx
	    }));
	}
},


generateBubble : function(descr) {
   this._bubbles.push(new Bubble(descr));
},

generateBubbles : function(number) {

    var NUM_BUBBLES = number;

    for (var i = 0; i < NUM_BUBBLES; ++i) {
        this.generateBubble();
    }
},

hasBubbles : function() {
	return !(this._bubbles.length === 0);
},

generatePowerUp : function(descr)
{
	this._powerUps.push(new PowerUp(descr));
},

generatePlayer : function(descr) {
    this._players.push(new player(descr));
},


killNearestplayer : function(xPos, yPos) {
    var theplayer = this._findNearestplayer(xPos, yPos).theplayer;
    if (theplayer) {
        theplayer.kill();
    }
},

yoinkNearestplayer : function(xPos, yPos) {
    var theplayer = this._findNearestplayer(xPos, yPos).theplayer;
    if (theplayer) {
        theplayer.setPos(xPos, yPos);
    }
},

resetplayers: function() {
    this._forEachOf(this._players, player.prototype.reset);
},

haltplayers: function() {
    this._forEachOf(this._players, player.prototype.halt);
},

toggleBubbles: function() {
    this._bShowBubbles = !this._bShowBubbles;
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

    if (this._bubbles.length === 0)
    {
    		this.generateBubbles(++gameManager.level);
    }

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowBubbles &&
            aCategory == this._bubbles)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
},

resetLevel: function() {

		//reset powerup effects
		powerUpEffectManager.reset();

		//kill all powerups
		for(var i = 0; i < entityManager._powerUps.length; i++)
		{
			entityManager._powerUps[i].kill();
		}

		//kill all bubbles
		for(var i = 0; i < entityManager._bubbles.length; i++)
		{
			entityManager._bubbles[i].kill();
		}

		//regenerate level
		entityManager.generateBubbles(gameManager.level);
},


//Reset all entities
reset: function() {

	this._bubbles  = [];
	this._WiresPlayerOne = [];
	this._WiresPlayerTwo = [];
	this._players   = [];
	this._powerUps = [];
},


}



// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();


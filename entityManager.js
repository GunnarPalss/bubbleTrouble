/*

entityManager.js

A module which handles arbitrary entity-management for "Bubble Trouble"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_bubbles   : [],
_Wires : [],
_players   : [],
_powerUps : [],

_bShowBubbles : true,

// "PRIVATE" METHODS


_generateBubbles : function(number) {

    var NUM_BUBBLES = number;

    for (var i = 0; i < NUM_BUBBLES; ++i) {
        this.generateBubble();
    }
},

_findNearestplayer : function(posX, posY) {
    var closestplayer = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._players.length; ++i) {

        var thisplayer = this._players[i];
        var playerPos = thisplayer.getPos();
        var distSq = util.wrappedDistSq(
            playerPos.posX, playerPos.posY,
            posX, posY,
            g_canvas.width, g_canvas.height);

        if (distSq < closestSq) {
            closestplayer = thisplayer;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theplayer : closestplayer,
        theIndex: closestIndex
    };
},

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
    this._categories = [this._bubbles, this._Wires, this._players, this._powerUps];
},

init: function() {
    this.generateBubble({
		cx: g_canvas.width/2,
		cy: g_canvas.height*0.1
	});
    this.generatePlayer({
        cx : 200,
        cy : 200
    });
},

fireWire: function(cx, cy, velX, velY, rotation) {

	//Ensure that you can only fire one wire at a time
	if(this._Wires.length === 0)
	{
	    this._Wires.push(new Wire({
	        cx   : cx
	    }));
	}
},


generateBubble : function(descr) {
   this._bubbles.push(new Bubble(descr));
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

    if (this._bubbles.length === 0) this._generateBubbles(1);

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
}

}



// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();


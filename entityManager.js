/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


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

_rocks   : [],
_Wires : [],
_players   : [],

_bShowRocks : true,

// "PRIVATE" METHODS

_generateRocks : function() {
    var i,
        NUM_ROCKS = 4;

    for (i = 0; i < NUM_ROCKS; ++i) {
        this.generateRock();
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
    this._categories = [this._rocks, this._Wires, this._players];
},

init: function() {
    //this._generateRocks();
    //this._generateplayer();
},

fireWire: function(cx, cy, velX, velY, rotation) {

	if(this._Wires.length === 0)
	{
	    this._Wires.push(new Wire({
	        cx   : cx
	    }));
	}
},

generateRock : function(descr) {
   /* this._rocks.push(new Rock(descr));*/
},

generateplayer : function(descr) {
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

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
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

    if (this._rocks.length === 0) this._generateRocks();

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowRocks &&
            aCategory == this._rocks)
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


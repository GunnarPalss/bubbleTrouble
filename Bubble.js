// ====
// BUBBLE
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bubble(descr) {

  // Common inherited setup logic from Entity
    this.setup(descr);

  // If bubble does not have a position, create one
    if(!this.cx && !this.cy) this.spawnPos();
    
  // Default speed, unless otherwise specified
    this.velX = this.velX || 2;
    this.velY = this.velY || 4;

  // Default sprite and scale, unless otherwise specified
    this.sprite = this.sprite || g_sprites.bubble;
    this.scale  = this.scale  || 1;

};

Bubble.prototype = new Entity();

Bubble.prototype.spawnPos = function () {
  
  // Range constants to help with position randomization
  //(Specifies a range away from borders)
    var baseRange = 50;
    var rightRange = 850;
    var bottomRange = 550;

  // Position randomization within range
    this.cx = (Math.random()*(rightRange-baseRange))+baseRange;
    this.cy = (Math.random()*(bottomRange-baseRange))+baseRange;
};

Bubble.prototype.update = function (du) {

  // Un-collisionize bubble
    spatialManager.unregister(this);
    
  // Dying = Death
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.velX;
    var nextY = prevY + this.velY;
    var R = this.getRadius()

  // Wall constraints
    if (R + nextX >= g_canvas.width || nextX - R <= 0) {
    		this.velX *=-1;
    }

  // Floor constraint
  // (Specific ball sizes always bounce equally high)
    if (R + nextY >= g_canvas.height) {
		if(this.scale <= 0.25) this.velY = -8;
		else if(this.scale <= 0.5) this.velY = -10;
		else if(this.scale <= 1) this.velY = -12;
    }

  // Simplified gravity-propelled acceleration
    var gravity = 0.2;
    this.velY += gravity;
    this.cx += this.velX * du;
    this.cy += this.velY * du;

  // Re-collisionize bubble
    spatialManager.register(this);

};

Bubble.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

// HACKED-IN AUDIO (no preloading)
Bubble.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Bubble.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");

Bubble.prototype.takeWireHit = function () {
    
  // Wire hits cause deaths
    this.kill();

  // Dead bubbles spawn two smaller bubbles
  // in opposite directions
    if (this.scale > 0.25) {
        this._spawnFragment(this.velX, -5);
        this._spawnFragment(-this.velX,-5);

        this.splitSound.play();
        this.splitSound.currentTime = 0;

  // Bubbles of minimal size dont spawn other bubbles
    } else {
        this.evaporateSound.play();
        this.evaporateSound.currentTime = 0;
    }
};

// Bubbles spawned from other bubbles are half as big
Bubble.prototype._spawnFragment = function (velX, velY) {
    entityManager.generateBubble({
        cx : this.cx,
        cy : this.cy,
        velX: velX,
        velY: velY,
        scale : this.scale /2
    });
};

Bubble.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy
    );
};
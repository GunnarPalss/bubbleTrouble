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

    if(!this.cx && !this.cy)
    {
    	this.randomisePosition();

    }

     if(!this.velX && !this.velY)
    {
    	this.randomiseVelocity();


    }



    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.bubble;
    this.scale  = this.scale  || 1;

/*
    // Diagnostics to check inheritance stuff
    this._rockProperty = true;
    console.dir(this);
*/

};

Bubble.prototype = new Entity();

Bubble.prototype.randomisePosition = function () {
    // Bubble randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height * 0.7;
    //this.rotation = this.rotation || 0;
};


/*  Gravity drasl fyrir seinna...
Bubble.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};
*/

Bubble.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 50;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = 2;
    this.velY = 4;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

  //  this.velRot = this.velRot ||
    //    util.randRange(MIN_ROT_SPEED, MAX_ROT_SPEED) / SECS_TO_NOMINALS;
};

Bubble.prototype.update = function (du) {

    spatialManager.unregister(this);
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.velX;
    var nextY = prevY + this.velY;
    var R = this.getRadius()


    //Make sure the balls don't go out of bounds:

    if (R + nextX >= g_canvas.width || nextX - R <= 0)  this.velX *=-1;
    if (R + nextY >= g_canvas.height || nextY - R <= 0) this.velY *=-1;

    var NOMINAL_GRAVITY = 0.12;
    this.velY += NOMINAL_GRAVITY;
    this.cx += this.velX * du;
    this.cy += this.velY * du;


    //this.rotation += 1 * this.velRot;
    //this.rotation = util.wrapRange(this.rotation,
    //                             0, consts.FULL_CIRCLE);

    this.wrapPosition();

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
    this.kill();

    if (this.scale > 0.25) {
        this._spawnFragment(this.velX, -Math.abs(2));
        this._spawnFragment(-this.velX, -Math.abs(2));

        this.splitSound.play();
        this.splitSound.currentTime = 0;

    } else {
        this.evaporateSound.play();
        this.evaporateSound.currentTime = 0;
    }
};

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
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

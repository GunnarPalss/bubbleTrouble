// ====
// BUBBLE
// ====

"use strict";



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
    var rect = this.getBoundingBox()
    console.log(rect);

    //Make sure the balls don't go out of bounds:

    if (rect.width/2 + nextX >= g_canvas.width || nextX - rect.width/2 <= 0)  this.velX *=-1;
    if (rect.height/2 + nextY >= g_canvas.height || nextY - rect.height/2 <= 0) this.velY *=-1;

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

Bubble.prototype.getBoundingBox = function () {
    return new Rectangle(this.cx-this.scale*g_sprites.bubble.width/2, this.cy-this.scale*g_sprites.bubble.height/2,
		this.scale*g_sprites.bubble.width, this.scale*g_sprites.bubble.height);
};

// HACKED-IN AUDIO (no preloading)
Bubble.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Bubble.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");

Bubble.prototype.takeWireHit = function () {
    this.kill();

    var rnd = Math.random();

    //20% probability of freeze
    if (rnd < 0.2)
    	entityManager.generatePowerUp({ cx: this.cx, cy: this.cy, type: PowerUp.prototype.type.FREEZE});

    //20% probability of double
    else if(rnd < 0.4)
    	entityManager.generatePowerUp({ cx: this.cx, cy: this.cy, type: PowerUp.prototype.type.DOUBLE});

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

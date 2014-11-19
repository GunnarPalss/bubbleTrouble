// ==========
// player STUFF
// ==========

"use strict";




// A generic contructor which accepts an arbitrary descriptor object
function player(descr) {

	// Common inherited setup logic from Entity
	this.setup(descr);

	this.rememberResets();

	// Default sprite, if not otherwise specified
	this.sprite = this.sprite || this.sprite;

	// Set normal drawing scale, and warp state off
	this._scale = 2;
	this.cy = g_canvas.height - this.sprite.height / 2;

	this.frameIndex = 2;

	this.stepLength = 10;
	this.leftStepCount = this.stepLength;
	this.rightStepCount = this.stepLength;
	this.activeWires = 0;
};

player.prototype = new Entity();

player.prototype.rememberResets = function () {
	// Remember my reset positions
	this.reset_cx = this.cx;
	this.reset_cy = this.cy;
};


// Initial, inheritable, default values
player.prototype.cx = g_canvas.width/2;
player.prototype.cy = g_canvas.height;


// HACKED-IN AUDIO (no preloading)
player.prototype.warpSound = new Audio(
	"sounds/shipWarp.ogg");

player.prototype.update = function (du) {

	//Kill player if Ball Hit him before
	if(this._isDeadNow)
		return entityManager.KILL_ME_NOW


	if(keys[this.KEY_FIRE]){
		this.frameIndex = 2;
		this.leftStepCount = 0;
		this.rightStepCount = 0;
	}
	else if(keys[this.KEY_LEFT] && this.cx > this.sprite.width/this.sprite.count/2){
		this.cx -= 2;

		this.rightStepCount = this.stepLength;

		if(this.leftStepCount == this.stepLength){
			if(this.frameIndex != 0){
				this.frameIndex = 0;
			}
			else if(this.frameIndex == 0){
				this.frameIndex = 1;
			}
			this.leftStepCount = 0;
		}
		else this.leftStepCount++;
	}
	else if(keys[this.KEY_RIGHT] && this.cx < g_canvas.width-this.sprite.width/this.sprite.count/2){
		this.cx += 2;

		this.leftStepCount = this.stepLength;

		if(this.rightStepCount == this.stepLength){
			if(this.frameIndex != 4){
				this.frameIndex = 4;
			}
			else if(this.frameIndex == 4){
				this.frameIndex = 3;
			}
			this.rightStepCount = 0;
		}
		else this.rightStepCount++;

	}
	else{
		this.frameIndex = 2;
	}


	// Handle firing
	this.maybeFireWire();


	this.handleCollision();


};

player.prototype.maybeFireWire = function () {
	if (keys[this.KEY_FIRE]) {
		entityManager.fireWire(this.cx, this);
	}
};


player.prototype.getBoundingBox = function() {
	return new Rectangle(this.cx-this.sprite.width/this.sprite.count/2,
		this.cy-this.sprite.height/2, this.sprite.width/this.sprite.count ,
		this.sprite.height);
}

player.prototype.handleCollision = function () {
	var entity = spatialManager.findEntityInRange(this, this.getBoundingBox());

	if(entity && entity instanceof PowerUp)
	{
		entity.type.activate();
		entity.kill();
	}
	else if (entity && entity instanceof Bubble)
	{
		this.lives--;
		entity.kill();
		for(var i = 0; i < entityManager._powerUps.length; i++)
		{
			entityManager._powerUps[i].kill();
		}

		for(var i = 0; i < entityManager._bubbles.length; i++)
		{
			entityManager._bubbles[i].kill();
		}

		entityManager._generateBubbles(gameManager.level);
	}


};


player.prototype.render = function (ctx) {
	var origScale = this.sprite.scale;

	this.sprite.scale = this._scale;
	this.sprite.drawSpriteIndex(ctx, this.frameIndex, this.cx, this.cy);

	this.sprite.scale = origScale;
};

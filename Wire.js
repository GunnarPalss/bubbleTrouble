// ======
// Wire
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Wire(descr) {

	// Common inherited setup logic from Entity
	this.setup(descr);

	// Make a noise when I am created (i.e. fired)
	this.fireSound.play();

/*
	this.cy = 300;
	this.velX = 0;
	this.velY = -0.01;
*/


/*
	// Diagnostics to check inheritance stuff
	this._WireProperty = true;
	console.dir(this);
*/

}

Wire.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Wire.prototype.fireSound = new Audio(
	"sounds/Grapple.wav");
Wire.prototype.zappedSound = new Audio(
	"sounds/bulletZapped.ogg");

// Initial, inheritable, default values
Wire.prototype.cx = 200;
Wire.prototype.cy = 900;
Wire.prototype.velX = 0;
Wire.prototype.velY = -10;
Wire.prototype.ttl = 5000 / NOMINAL_UPDATE_INTERVAL;



Wire.prototype.update = function (du) {

	// TODO: YOUR STUFF HERE! --- Unregister and check for death

	//Should kill wire if it has hit a bubble
	this.ttl -= du;
	if(this._isDeadNow || this.ttl < 0)
		return entityManager.KILL_ME_NOW


	if(!(powerUpEffectManager.freeze.active&&this.cy<=g_sprites.Wire.height/2))
		this.cy += this.velY * du;



	if(this.collidesWithWall() && !powerUpEffectManager.freeze.active)
		return entityManager.KILL_ME_NOW



	if(this.collidesWithBall())
		return entityManager.KILL_ME_NOW


};

Wire.prototype.getRadius = function () {
	return 4;
};


Wire.prototype.collidesWithWall = function () {

	//Hit the wall
	if((this.cy - g_sprites.Wire.height/2) < 0)
		return true
	else
		return false
};


Wire.prototype.getBoundingBox = function()
{
	return new Rectangle(this.cx-g_sprites.Wire.width/2, this.cy-g_sprites.Wire.height/2,
		g_sprites.Wire.width, g_sprites.Wire.height);
}

Wire.prototype.collidesWithBall = function () {
	var entity = spatialManager.findEntityInRange(this, this.getBoundingBox());
	if(entity)
	{
		//done with level
		if(!entityManager.hasBubbles())
		{
			gameManager.level++; //update

			if(gameManager.level > gameManager.maxLevel)
			{
				gameManager.gameWon = true;
			}

			entityManager.resetLevel(); //cleanup and setup new level
		}

		entity.takeWireHit();
		spatialManager.unregister(entity);
		return true
	}
	else
		return false

};


Wire.prototype.render = function (ctx) {

	g_sprites.Wire.drawCentredAt(
		ctx, this.cx, this.cy, 0
	);

};

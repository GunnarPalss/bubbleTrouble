// ======
// Wire
// ======

"use strict";



// A generic contructor which accepts an arbitrary descriptor object
function Wire(descr) {

	// Common inherited setup logic from Entity
	this.setup(descr);

	// Make a noise when I am created (i.e. fired)
	this.fireSound.play();



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



	//Should kill wire if it has hit a bubble
	this.ttl -= du;
	if(this._isDeadNow || this.ttl < 0)
		return entityManager.KILL_ME_NOW

	//move wire upwards
	if(!(powerUpEffectManager.freeze.active&&this.cy<=g_sprites.Wire.height/2))
		this.cy += this.velY * du;


	//Kill if collides with wall
	if(this.collidesWithWall() && !powerUpEffectManager.freeze.active)
		return entityManager.KILL_ME_NOW



	if(this.collidesWithBall())
		return entityManager.KILL_ME_NOW


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

// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

	// Common inherited setup logic from Entity
	this.setup(descr);

	// Make a noise when I am created (i.e. fired)
	this.fireSound.play();

/*
	// Diagnostics to check inheritance stuff
	this._bulletProperty = true;
	console.dir(this);
*/

}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(
	"sounds/bulletFire.ogg");
Bullet.prototype.zappedSound = new Audio(
	"sounds/bulletZapped.ogg");

// Initial, inheritable, default values
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;



Bullet.prototype.update = function (du) {

	// TODO: YOUR STUFF HERE! --- Unregister and check for death

	this.cx += this.velX * du;
	this.cy += this.velY * du;


	if(this.collidesWithWall())
		return entityManager.KILL_ME_NOW



	if(this.collidesWithBall())
		return entityManager.KILL_ME_NOW


};

Bullet.prototype.getRadius = function () {
	return 4;
};


Bullet.prototype.collidesWithWall = function () {

	//Hit the wall
	if((this.cy - g_sprites.bullet.height/2) < 0)
		return true
	else
		return false
};

Bullet.prototype.collidesWithBall = function () {
	return false
};


Bullet.prototype.render = function (ctx) {

	g_sprites.bullet.drawWrappedCentredAt(
		ctx, this.cx, this.cy, 0
	);

};

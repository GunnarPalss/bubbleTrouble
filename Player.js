// ==========
// player STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function player(descr) {

	// Common inherited setup logic from Entity
	this.setup(descr);

	this.rememberResets();

	// Default sprite, if not otherwise specified
	this.sprite = this.sprite || g_sprites.player;

	// Set normal drawing scale, and warp state off
	this._scale = 1;
	this.cy = g_canvas.height - g_sprites.player.height / 2;

};

player.prototype = new Entity();

player.prototype.rememberResets = function () {
	// Remember my reset positions
	this.reset_cx = this.cx;
	this.reset_cy = this.cy;
};

player.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
player.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);
player.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
player.prototype.cx = g_canvas.width/2;
player.prototype.cy = g_canvas.height;


// HACKED-IN AUDIO (no preloading)
player.prototype.warpSound = new Audio(
	"sounds/shipWarp.ogg");

player.prototype.update = function (du) {

	if(keys[this.KEY_LEFT] && this.cx > g_sprites.player.width/2) this.cx -= 2;
	if(keys[this.KEY_RIGHT] && this.cx < g_canvas.width-g_sprites.player.width/2) this.cx += 2;
	// Handle firing
	this.maybeFireWire();
};

player.prototype.maybeFireWire = function () {
	if (keys[this.KEY_FIRE]) {
		entityManager.fireWire(
		   this.cx);
	}
};

player.prototype.render = function (ctx) {
	var origScale = this.sprite.scale;

	this.sprite.scale = this._scale;
	this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, 0
	);
	this.sprite.scale = origScale;
};

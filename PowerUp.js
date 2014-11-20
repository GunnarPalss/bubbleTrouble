"use strict";

/*

Handles PowerUp entities, that is the powerUp objects that
every player craves.
*/


//Summary of the types of powerUps
var powerUpTypes =
{
	//Freezes the wire
	freeze : {
		id: "freeze",
		activate: function(ttl) {
			powerUpEffectManager.activateFreeze(ttl);
		}},

	// Allows player to shoot two wires
	double : {
		id: "double",
		activate: function(ttl) {
			powerUpEffectManager.activateDouble(ttl);

	}}
};

//The generic powerUp entity Object
function PowerUp(descr)
{
	this.setup(descr);

	//Downward speed
	this.velY = 5;

	//How long is the object alive?
	this.ttl = 10000 / NOMINAL_UPDATE_INTERVAL;

	//id of the type
	this.id = this.type.id;

	//register this in our spatial universe
	spatialManager.register(this);
}

PowerUp.prototype.ttl = 10000 / NOMINAL_UPDATE_INTERVAL;
PowerUp.prototype = new Entity();

PowerUp.prototype.update = function(du)
{
	//Check if the powerUp is dead or it's been claimed
	this.ttl -= du;
	if(this._isDeadNow || this.ttl < 0)
	{
		spatialManager.unregister(this);
		return entityManager.KILL_ME_NOW
	}

	//PowerUps fall with a certain speed to the ground
	this.cy += this.velY * du;

	//PowerUps remain on the ground
	if(this.cy + g_sprites[this.id].height/2 >= g_canvas.height)
		this.cy = g_canvas.height - g_sprites[this.id].height/2;
}

PowerUp.prototype.getBoundingBox = function()
{
	return new Rectangle(this.cx-g_sprites[this.id].width/2, this.cy-g_sprites[this.id].height/2, g_sprites[this.id].width, g_sprites[this.id].height);
}

PowerUp.prototype.render = function(ctx)
{
	var rect = this.getBoundingBox();
	g_sprites[this.id].drawCentredAt(ctx,rect.x+g_sprites[this.id].width/2,rect.y + g_sprites[this.id].height/2,0);

}



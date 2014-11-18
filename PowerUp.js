"use strict";


function PowerUp(descr)
{
	this.setup(descr);
	this.width = 20;
	this.height = 20;
	this.velY = 5;
	this.ttl = 10000 / NOMINAL_UPDATE_INTERVAL;

	spatialManager.register(this);
}


PowerUp.prototype = new Entity();

PowerUp.prototype.ttl = 10000 / NOMINAL_UPDATE_INTERVAL;



PowerUp.prototype.type =
{

	FREEZE : {
		color: "#0000FF",
		activate: function() {
			powerUpEffectManager.activateFreeze(PowerUp.prototype.ttl);
		}},
	DOUBLE : {
		color: "#0000",
		activate: function() {
			powerUpEffectManager.activateDouble(PowerUp.prototype.ttl);

	}}
}

PowerUp.prototype.update = function(du)
{
	this.ttl -= du;
	if(this._isDeadNow || this.ttl < 0)
	{
		spatialManager.unregister(this);
		return entityManager.KILL_ME_NOW
	}

	//PowerUps fall with a certain speed to the ground
	this.cy += this.velY * du;

	//PowerUps remain on the ground
	if(this.cy + this.height/2 >= g_canvas.height)
		this.cy = g_canvas.height - this.height/2;




}

PowerUp.prototype.getBoundingBox = function()
{
	return new Rectangle(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
}
PowerUp.prototype.render = function(ctx)
{

	ctx.save();
	ctx.fillStyle = this.type.color;
	var rect = this.getBoundingBox();
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

	ctx.restore();
}



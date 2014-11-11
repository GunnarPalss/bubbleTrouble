"use strict";


/*
A simple class for Rectangle and collisions
*/
function Rectangle(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}


Rectangle.prototype.collidesWithCircle = function(cx, cy, radius)
{
    var distX = Math.abs(cx - this.x-this.width/2);
    var distY = Math.abs(cy - this.y-this.height/2);

    if (distX > (this.width/2 + radius)) { return false; }
    if (distY > (this.height/2 + radius)) { return false; }

    if (distX <= (this.width/2)) { return true; }
    if (distY <= (this.height/2)) { return true; }

    var dx=distX-this.width/2;
    var dy=distY-this.height/2;
    return (dx*dx+dy*dy<=(radius*radius));
}


Rectangle.prototype.collidesWithVerticalLine = function(x)
{
	return this.x <= x && x <= (this.x + this.width);
}






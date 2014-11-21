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


/*
	Returns true if rectangle collides with a given circle
	otherwise false
*/
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

/*
	Returns true if rectangle collides with a given rectangle
	otherwise false
*/
Rectangle.prototype.collidesWithRect = function(rect)
{
	  return !(rect.x > this.x+this.width ||
           rect.x+rect.width < this.x ||
           rect.y > this.y+this.height ||
           rect.y+rect.height < this.y);
}






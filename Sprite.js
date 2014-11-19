// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.scale = 1;

    this.count = 1;

}

Sprite.prototype.drawAt = function (ctx, x, y) {
    this.x = x;
    this.y = y;
    
    ctx.drawImage(this.image, 
                  x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    this.x = cx;
    this.y = cy;

    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, 
                  -w/2, -h/2);
    
    ctx.restore();
};  

Sprite.prototype.drawPartCentredAt = function (ctx, cx, cy, percentage) {
    
    ctx.drawImage(this.image, cx, cy, 50, 50);
/*
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 25, Math.PI * 2 * percentage, 0, false);
    
    ctx.fill();
    ctx.closePath();
    ctx.clip();

    

    ctx.beginPath();
    ctx.arc(25, 25, 25, Math.PI * 2 * percentage, 0, false);
    ctx.clip();
    ctx.closePath();

    ctx.restore();
*/
};  



Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    this.x = cx;
    this.y = cy;

    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {
    this.x = cx;
    this.y = cy;

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};

Sprite.prototype.drawSpriteIndex = function(ctx, index, cx, cy){

    this.x = cx;
    this.y = cy;

    ctx.save();
    ctx.drawImage(this.image, index*this.width/this.count, 0, this.width/this.count, this.height, cx-this.width/this.count/2, cy-this.height/2, this.width/this.count, this.height);
    ctx.restore();
};

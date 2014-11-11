/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS

//Insert a value into the _entities array, keeps the array sorted, O(N)
_insert: function(id, entity) {

	this._entities.push({spatialID: id, entity: entity});


},

//O(N) because of array splice
_delete: function(id) {

	for(var i=0; i<this._entities.length; i++)
	{
		if(this._entities[i].spatialID === id)
		{
			this._entities.splice(i, 1);
			break;
		}

	}

},



// PUBLIC METHODS

getNewSpatialID : function() {

	return this._nextSpatialID++;

},

register: function(entity) {
	var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    this._insert(spatialID, entity);

},

unregister: function(entity) {
	var spatialID = entity.getSpatialID();

	this._delete(spatialID)

},

findEntityInRange: function(rect) {


	for(var i=0; i<this._entities.length; i++)
    {
    	var entity = this._entities[i].entity;


    	//entity is a circle
    	var entityRad = entity.getRadius();
    	var entityPos = entity.getPos();
    	if (rect.collidesWithCircle(entityPos.posY, entityPos.posX, entityRad))
    		return entity



    }


},

render: function(ctx) {
	var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var i=0; i<this._entities.length; i++) {

        var e = this._entities[i].entity;
        var pos = e.getPos();


        var radius = e.getRadius();
        util.strokeCircle(ctx, pos.posX, pos.posY, radius);


    }
    ctx.strokeStyle = oldStyle;
}

}

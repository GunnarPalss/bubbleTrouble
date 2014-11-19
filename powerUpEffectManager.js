"use strict";

/*

Manages the effect of powerUps once player's
claim them.

*/

var powerUpEffectManager =
{
	init: function()
		{
			var pManager = this;
			Object.keys(powerUpTypes).forEach(function(powerUpId)
			{

				pManager[powerUpId] = {active: false, ttl: 0};

			});
		},



	update: function(du){


		var pManager = this;
		Object.keys(powerUpTypes).forEach(function(powerUpId)
		{
			//check if powerup is active decreas its time to live
			//and kill it if necessary
			if(pManager[powerUpId].active)
			{
				pManager[powerUpId].ttl -= du;
				if(pManager[powerUpId].ttl)
				{
				pManager[powerUpId].active = false;
					pManager[powerUpId].ttl = 0
				}
			}

		});

	},

	activateFreeze: function(ttl)
	{
		this.freeze.active = true;
		this.freeze.ttl = ttl;
	},
	activateDouble: function(ttl)
	{

		this.double.active = true;
		this.double.ttl = ttl;
	},
	reset: function()
	{
		this.init();
	}


}

"use strict";



var powerUpEffectManager =
{
	freeze: {active: false, ttl: 0},
	double: {active: false, ttl: 0},


	update: function(du){

		if(this.freeze.active)
		{
			this.freeze.ttl -= du;
			if(this.freeze.ttl <= 0)
			{
				this.freeze.active = false;
				this.ttl = 0;
			};
		};

		if(this.double.active)
		{
			this.double.ttl -= du;
			if(this.double.ttl <= 0)
			{
				this.double.active = false;
				this.double = 0;
			};
		}
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
	}


}

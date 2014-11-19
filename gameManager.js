"use strict";

var gameManager = {

	startScreen : 0,
	gameScreen : 1,
	controlScreen: 2,

	level : 1,
	playerOneLife: 3,
	playerTwoLife: 3,
	twoPlayer: false,

	position: 0,

	introAnimation: false,


	renderScreen: function(ctx){
		if(this.position === this.startScreen){
			this._renderStartScreen(ctx);
		}
		else if(this.position === this.gameScreen){
			entityManager.render(ctx);
			this._renderGameScreen(ctx);
		}
		else if(this.position === this.controlScreen){
			this._renderControlScreen(ctx);
		}
	},

	updateScreen: function(du){
		if(this.position === this.startScreen){
			this._updateStartScreen(du);
		}
		else if(this.position === this.gameScreen){
			this._updateGameScreen(du);
		}
		else if (this.position === this.controlScreen){
			this._updateControlScreen(du);
		}
	},


	//
	//	START SCREEN
	//

	// Animation constants for updateScreen
	memoY :0,
	memoR : -0.1,
	displayTitle: false,
	hannaX: 1000,
	gisliX: -100,
	menuY: 620,

	finalMemoY : 150,
	finalMemoR : 0,
	finalHannaX: 750,
	finalGisliX: 150,
	finalMenuY: 410,

	_renderStartScreen :function(ctx){

		g_sprites.menuBg.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);

		g_sprites.memo.drawCentredAt(ctx,g_canvas.width/2,this.memoY,this.memoR);
		if(this.displayTitle) g_sprites.lekatrouble.drawCentredAt(g_ctx,g_canvas.width/2,150,0);

		g_sprites.hanna.drawCentredAt(ctx,this.hannaX,450,0);
		g_sprites.gisli.drawCentredAt(ctx,this.gisliX,450,0);

		g_sprites.oneplayer.drawCentredAt(ctx,g_canvas.width/2,this.menuY,0);
		g_sprites.twoplayer.drawCentredAt(ctx,g_canvas.width/2,this.menuY+50,0);
		g_sprites.controls.drawCentredAt(ctx,g_canvas.width/2,this.menuY+100,0);


	},

	_updateStartScreen: function(du){
		if(this.introAnimation){
			// Init screen animation
			if(this.memoY < this.finalMemoY){
				this.memoY += 1.5;
				this.memoR += 0.003;
			}
			else this.displayTitle = true;

			if(this.displayTitle){
				if(this.hannaX > this.finalHannaX){
					this.hannaX -= 4;
					this.gisliX += 4;
				}
				else{
					if(this.menuY > this.finalMenuY) this.menuY -=10;
				}
			}
		}
		else{
			this.memoY = this.finalMemoY;
			this.memoR = this.finalMemoR;
			this.hannaX = this.finalHannaX;
			this.gisliX = this.finalGisliX;
			this.menuY = this.finalMenuY;
			this.displayTitle = true;
		}



		g_sprites.oneplayer.image = g_images.oneplayer;
		g_sprites.twoplayer.image = g_images.twoplayer;
		g_sprites.controls.image = g_images.controls;

		if(this._isMouseOver(g_sprites.oneplayer)){
			g_sprites.oneplayer.image = g_images.oneplayer_active;
			if(g_mouseButton) this.position = 1;
		}
		else if(this._isMouseOver(g_sprites.twoplayer)){
			g_sprites.twoplayer.image = g_images.twoplayer_active;
			if(g_mouseButton) this.position = 1;
		}
		else if(this._isMouseOver(g_sprites.controls)){
			g_sprites.controls.image = g_images.controls_active;
			if(g_mouseButton) this.position = 2;
		}



	},

	_isMouseOver: function(sprite){
		if(util.isBetween(g_mouseX, sprite.x-sprite.width/2, sprite.x+sprite.width/2) && 
			util.isBetween(g_mouseY, sprite.y-sprite.height/2, sprite.y+sprite.height/2)){
			return true;
		}
		return false;
	},




	//GAME SCREEN -----------
	_renderGameScreen :function(ctx){
		entityManager.render(ctx);
    	if (g_renderSpatialDebug) spatialManager.render(ctx);


    	for(var i=0; i < this.playerOneLife; i++){
    		g_sprites.playerOneLifeIcon.drawCentredAt(ctx,g_canvas.width-(30+45*i),30,0);
    	}

   		if(this.twoplayer){
   			for(var i=0; i < this.playerTwoLife; i++){
   				g_sprites.playerTwoLifeIcon.drawCentredAt(ctx,30+45*i,30)
   			}
   		}

	},
	_updateGameScreen: function(du){
	    processDiagnostics();
	    entityManager.update(du);
	    powerUpEffectManager.update(du);

	    // Prevent perpetual firing!
	    eatKey(player.prototype.KEY_FIRE);
	},


	_renderControlScreen :function(ctx){
		g_sprites.menuBg.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);
		g_sprites.controlScreen.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2.5,0);
		g_sprites.back.drawCentredAt(ctx,g_canvas.width/2,this.menuY+150,0);

		g_sprites.back.image = g_images.back;
		if(this._isMouseOver(g_sprites.back)){
			g_sprites.back.image = g_images.back_active;
			if(g_mouseButton) this.position = 0;
		}

	},

	_updateControlScreen: function(du){

	},

	reset: function(du){

		this.level = 1;
		this.playerOneLife = 5;
		this.playerTwoLife = 5;
		this.twoPlayer = false;

		entityManager.reset();
		powerUpEffectManager.reset();
	
	},
}

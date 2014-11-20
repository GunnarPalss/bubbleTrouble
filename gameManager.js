"use strict";

var gameManager = {

	startScreen : 0,
	gameScreen : 1,
	controlScreen: 2,
	lostScreen: 3,
	wonScreen: 4,
	maxLevel : 5,
	level : 1,
	twoPlayer: false,
	gameLost: false,
	gameWon: false,
	mute: false,

	position: 0,

	introAnimation: false,


	renderScreen: function(ctx){
		if(this.position == this.lostScreen){
			this._renderGameLostScreen(ctx);
		}
		else if(this.position == this.wonScreen){
			this._renderGameWonScreen(ctx);
		}
		else if(this.position === this.startScreen){
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


		if(this.position == this.lostScreen){
			this._updateGameLostScreen(ctx);
		}
		else if(this.position == this.wonScreen){
			this._updateGameWonScreen(ctx);
		}
		else if(this.position === this.startScreen){
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

		document.getElementById("intro").play();

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
				document.getElementById("logo").play();
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
			this.twoPlayer = false;
			if(g_mouseButton) {
				this.position = this.gameScreen;
				document.getElementById("intro").pause();
				document.getElementById("intro").currentTime = 0;
				entityManager.init();
				powerUpEffectManager.init();
			}
		}
		else if(this._isMouseOver(g_sprites.twoplayer)){
			g_sprites.twoplayer.image = g_images.twoplayer_active;
			this.twoPlayer = true;
			if(g_mouseButton) {
				this.position = this.gameScreen;
				document.getElementById("intro").pause();
				document.getElementById("intro").currentTime = 0;
				entityManager.init();
				powerUpEffectManager.init();
			}
		}
		else if(this._isMouseOver(g_sprites.controls)){
			g_sprites.controls.image = g_images.controls_active;
			if(g_mouseButton) this.position = this.controlScreen;
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

		switch(this.level){
			case 1:
				g_sprites.menuBg.image = g_images.menuBg;
				break;
			case 2:
				g_sprites.menuBg.image = g_images.levelTwoBg;
				break;
			case 3:
				g_sprites.menuBg.image = g_images.levelThreeBg;
				break;
			case 4:
				g_sprites.menuBg.image = g_images.levelFourBg;
				break;
			case 5:
				g_sprites.menuBg.image = g_images.levelFiveBg;
				break;
		}

		entityManager.render(ctx);
    	if (g_renderSpatialDebug) spatialManager.render(ctx);


    	for(var i=0; i < entityManager._players[0].lives; i++){
    		g_sprites.playerOneLifeIcon.drawCentredAt(ctx,30+45*i,30,0);
    	}

   		if(this.twoPlayer){
   			for(var i=0; i < entityManager._players[1].lives; i++){
   				g_sprites.playerTwoLifeIcon.drawCentredAt(ctx,g_canvas.width-(30+45*i),30)
   			}
   		}

   		if(powerUpEffectManager.freeze.active){
   			g_sprites.barFalki.drawPartCentredAt(ctx,g_canvas.width/2 + 30, 40,powerUpEffectManager.freeze.ttl/(10000 / NOMINAL_UPDATE_INTERVAL))
   		}

   		if(powerUpEffectManager.double.active){
   			g_sprites.barPopo.drawPartCentredAt(ctx,g_canvas.width/2 - 30, 40,powerUpEffectManager.double.ttl/(10000 / NOMINAL_UPDATE_INTERVAL))
   		}

	},
	_updateGameScreen: function(du){
	    processDiagnostics();
	    entityManager.update(du);
	    powerUpEffectManager.update(du);

	    // Prevent perpetual firing!
	    eatKey(entityManager._players[0].KEY_FIRE);
	    if(this.twoPlayer){
	    	eatKey(entityManager._players[1].KEY_FIRE);
	    }

	    if(this.gameWon){
	    	console.log("GameWon");
	    	this.position = this.wonScreen;
	    }
	    if(this.gameLost){
	    	console.log("gamelost");
	    	this.position = this.lostScreen;
	    }

	},


	_renderControlScreen :function(ctx){
		g_sprites.menuBg.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);
		g_sprites.controlScreen.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2);
		g_sprites.back.drawCentredAt(ctx,g_canvas.width-125,this.menuY-335);

		g_sprites.back.image = g_images.back;
		if(this._isMouseOver(g_sprites.back)){
			g_sprites.back.image = g_images.back_active;
			if(g_mouseButton) this.position = 0;
		}

	},

	_updateControlScreen: function(du){

	},

	_renderGameLostScreen: function(du){
		g_sprites.gameLost.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);
		this._lostWonScreenMenu();
	},

	_updateGameLostScreen: function(du){

	},

	_renderGameWonScreen: function(du){
		g_sprites.gameWon.drawCentredAt(ctx,g_canvas.width/2,g_canvas.height/2,0);
		this._lostWonScreenMenu();
	},

	_updateGameWonScreen: function(du){

	},

	_lostWonScreenMenu: function(){
		g_sprites.playAgain.drawCentredAt(ctx,g_canvas.width/2-100,450,0);
		g_sprites.menu.drawCentredAt(ctx,g_canvas.width/2+100,450,0);

		g_sprites.playAgain.image = g_images.playAgain;
		g_sprites.menu.image = g_images.menu;

		if(this._isMouseOver(g_sprites.playAgain)){
			g_sprites.playAgain.image = g_images.playAgain_active;
			if(g_mouseButton){
				this.reset();
				this.position = this.gameScreen;
			} 
		}

		if(this._isMouseOver(g_sprites.menu)){
			g_sprites.menu.image = g_images.menu_active;
			if(g_mouseButton){
				this.reset();
				this.position = this.startScreen;
			} 
		}
	},

	reset: function(du){
		
		this.level = 1;
		this.gameLost = false;
		this.gameWon = false;
		entityManager.resetGame();
		powerUpEffectManager.reset();
		entityManager.init();

	},
}

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");



function initMenu(){

	g_sprites.bg.drawCentredAt(g_ctx,g_canvas.width/2,g_canvas.height/2,0);
	g_sprites.memo.drawCentredAt(g_ctx,g_canvas.width/2,150,0);
	g_sprites.lekatrouble.drawCentredAt(g_ctx,g_canvas.width/2,150,0);

	g_sprites.hanna.drawCentredAt(g_ctx,800,450,0);
	g_sprites.gisli.drawCentredAt(g_ctx,100,450,0);

	g_sprites.oneplayer.drawCentredAt(g_ctx,g_canvas.width/2,380,0);
	g_sprites.twoplayer.drawCentredAt(g_ctx,g_canvas.width/2,430,0);
	g_sprites.controls.drawCentredAt(g_ctx,g_canvas.width/2,480,0);
	g_sprites.quit.drawCentredAt(g_ctx,g_canvas.width/2,530,0);


}



// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
    	lekatrouble   		: "img/menu/lekatrouble.png",
        memo   				: "img/menu/memo.png",
        gisli   			: "img/menu/gislifreyr.png",
        hanna   			: "img/menu/hannabirna.png",
        bg   				: "img/menu/bg.png",
        oneplayer  			: "img/menu/1player.png",
        twoplayer   		: "img/menu/2player.png",
        controls   			: "img/menu/controls.png",
        quit   				: "img/menu/quit.png",
        oneplayer_active   	: "img/menu/1player_active.png",
        twoplayer_active   	: "img/menu/2player_active.png",
        controls_active   	: "img/menu/controls_active.png",
        quit_active   		: "img/menu/quit_active.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};


function preloadDone() {

    g_sprites.lekatrouble  = new Sprite(g_images.lekatrouble);
	g_sprites.memo  = new Sprite(g_images.memo);
	g_sprites.gisli  = new Sprite(g_images.gisli);
	g_sprites.hanna  = new Sprite(g_images.hanna);
	g_sprites.bg  = new Sprite(g_images.bg);
	g_sprites.oneplayer  = new Sprite(g_images.oneplayer);
	g_sprites.twoplayer  = new Sprite(g_images.twoplayer);
	g_sprites.controls  = new Sprite(g_images.controls);
	g_sprites.quit  = new Sprite(g_images.quit);
	g_sprites.oneplayer_active  = new Sprite(g_images.oneplayer_active);
	g_sprites.twoplayer_active  = new Sprite(g_images.twoplayer_active);
	g_sprites.controls_active  = new Sprite(g_images.controls_active);
	g_sprites.quit_active  = new Sprite(g_images.quit_active);


    initMenu();
}

// Kick it off
requestPreloads();


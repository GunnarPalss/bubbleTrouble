// =========
// BubbleTrouble
// =========
/*

A revamp of Bubble Trouble!

*/

"use strict";


var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC DIAGNOSTICS


var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');



function processDiagnostics() {


    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RESET)) entityManager.resetLevel();


}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        player   : "img/player1.png",
        player2 : "img/player2.png",
        bubble   : "img/memo.png",
        wire   : "img/wire.png",

        // menu
        lekatrouble         : "img/menu/lekatrouble.png",
        memo                : "img/menu/memo.png",
        gisli               : "img/menu/gislifreyr.png",
        hanna               : "img/menu/hannabirna.png",
        menuBg              : "img/menu/bg.png",
        oneplayer           : "img/menu/1player.png",
        twoplayer           : "img/menu/2player.png",
        controls            : "img/menu/controls.png",
        oneplayer_active    : "img/menu/1player_active.png",
        twoplayer_active    : "img/menu/2player_active.png",
        controls_active     : "img/menu/controls_active.png",
        controlScreen       : "img/controls.png",
        back                : "img/back.png",
        back_active         : "img/back_active.png",

        playerOneLifeIcon   : "img/Hanna_life.png",
        playerTwoLifeIcon   : "img/Gisli_life.png",

        levelTwoBg          : "img/bg2.png",
        levelThreeBg        : "img/bg3.png",
        levelFourBg         : "img/bg4.png",
        levelFiveBg         : "img/bg5.png",

        powerFalki          : "img/powerFalki.png",
        powerPopo           : "img/powerPopo.png",
        barFalki            : "img/barFalki.png",
        barPopo             : "img/barPopo.png",

        gameLost            : "img/lost.png",
        gameWon             : "img/won.png",

        playAgain           : "img/playagain.png",
        menu                : "img/menu.png",
        playAgain_active    : "img/playagain_active.png",
        menu_active         : "img/menu_active.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};


function preloadDone() {

    g_sprites.player  = new Sprite(g_images.player);
    g_sprites.player2 = new Sprite(g_images.player2);

    g_sprites.player.count = 5;
    g_sprites.player2.count = 5;

    g_sprites.bubble  = new Sprite(g_images.bubble);

    g_sprites.Wire = new Sprite(g_images.wire);

    g_sprites.playerOneLifeIcon = new Sprite(g_images.playerOneLifeIcon);
    g_sprites.playerTwoLifeIcon = new Sprite(g_images.playerTwoLifeIcon);

    //Powerups
    g_sprites.freeze= new Sprite(g_images.powerFalki);
    g_sprites.double = new Sprite(g_images.powerPopo);

    g_sprites.barFalki = new Sprite(g_images.barFalki);
    g_sprites.barPopo = new Sprite(g_images.barPopo);

    g_sprites.gameLost = new Sprite(g_images.gameLost);
    g_sprites.gameWon = new Sprite(g_images.gameWon);
    g_sprites.playAgain = new Sprite(g_images.playAgain);
    g_sprites.menu = new Sprite(g_images.menu);


    //Menu
    g_sprites.lekatrouble  = new Sprite(g_images.lekatrouble);
    g_sprites.memo  = new Sprite(g_images.memo);
    g_sprites.gisli  = new Sprite(g_images.gisli);
    g_sprites.hanna  = new Sprite(g_images.hanna);
    g_sprites.menuBg  = new Sprite(g_images.menuBg);
    g_sprites.oneplayer  = new Sprite(g_images.oneplayer);
    g_sprites.twoplayer  = new Sprite(g_images.twoplayer);
    g_sprites.controls  = new Sprite(g_images.controls);
    g_sprites.controlScreen = new Sprite(g_images.controlScreen);
    g_sprites.back = new Sprite(g_images.back);





    main.init();
}

// Kick it off
requestPreloads();

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


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);
    powerUpEffectManager.update(du);

    eatKey(player.prototype.KEY_FIRE);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');



function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltplayers();

    if (eatKey(KEY_RESET)) entityManager.resetplayers();


}




// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        player   : "img/player1.png",
        bubble   : "img/memo.png",
        wire   : "img/wire.png",

        // menu
        lekatrouble         : "img/menu/lekatrouble.png",
        memo                : "img/menu/memo.png",
        gisli               : "img/menu/gislifreyr.png",
        hanna               : "img/menu/hannabirna.png",
        menuBg               : "img/menu/bg.png",
        oneplayer           : "img/menu/1player.png",
        twoplayer           : "img/menu/2player.png",
        controls            : "img/menu/controls.png",
        oneplayer_active    : "img/menu/1player_active.png",
        twoplayer_active    : "img/menu/2player_active.png",
        controls_active     : "img/menu/controls_active.png",
        controlScreen       : "img/controls.png",
        back                : "img/back.png",
        back_active         : "img/back_active.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};


function preloadDone() {

    g_sprites.player  = new Sprite(g_images.player);
    g_sprites.player.count = 5;

    g_sprites.bubble  = new Sprite(g_images.bubble);

    g_sprites.Wire = new Sprite(g_images.wire);

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

    entityManager.init();
    powerUpEffectManager.init();


    main.init();
}

// Kick it off
requestPreloads();

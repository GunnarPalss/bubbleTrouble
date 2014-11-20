// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0,
    g_mouseButton;

function handleMouse(evt) {
    
    if(evt.type === "mouseup"){
    	g_mouseButton = 0;
    	return;
    }
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    // If no button is being pressed, then bail
    g_mouseButton = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!g_mouseButton) return;
    
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
window.addEventListener("mouseup", handleMouse);
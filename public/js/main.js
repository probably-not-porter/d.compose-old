// PUBLIC VARIABLES, GAME SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 640;
var height = 640;
var block_size = 32;
var parallax_speed = 0.05;
var padding = 200; // scroll padding around player
var terminal_velocity = 5;
canvas.width = width;
canvas.height = height;

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.textRendering = "geometricPrecision";
ctx.textRendering = "optimizeLegibility";
var scale = window.devicePixelRatio; 
console.log(scale);
ctx.scale(scale, scale);

var img_bg1 = document.getElementById("bg1");
var img_bg2 = document.getElementById("bg2");
var img_bg3 = document.getElementById("bg3");

// PLAYER AND GAME SETTINGS
var player = {
    x: width / 2,
    y: 200,
    width: 16,
    height: 16,
    speed: 1.2,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false,
    color:'#E6AC27'
},
levels = [
    [
        "b1 ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 %% ## ## ## ## ## ## ## ## ## ## b1 ## b1 ## ## b1 ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 pr ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 ## ## pl pm pr ## ## ## ## b1 b1 ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 ## ## ## ## ## ## ## ## ## b1 ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##",
        "b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1 b1"
    ],
    ["## %% ##","## b1 ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##",
    "## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##",
    "## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##",
    "## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##",
    "## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","## ## ##","b1 b1 b1"]
]
keys = [],
friction = 0.8,
gravity = 0.1,
colliders = [],
objects = [],
powerup = [],
enemies = [];

// LEVEL LOADER
function load_level(n){
    level = build_level(levels[n], block_size)
    console.log(level);
    if (levels[n]) {
        player.x = JSON.parse(JSON.stringify(level.playerx));
        player.y = JSON.parse(JSON.stringify(level.playery));
        colliders = JSON.parse(JSON.stringify(level.colliders || []));
        powerup = JSON.parse(JSON.stringify(level.powerup || []));
        objects = JSON.parse(JSON.stringify(level.objects || []));
        enemies = JSON.parse(JSON.stringify(level.enemies || []));
    }
}

// Start the game
window.addEventListener("load", function () {
    load_level(0);
    starting_offset();
    engine_update();
    document.getElementById("themesong").play()
});
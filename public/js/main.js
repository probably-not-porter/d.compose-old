

// PUBLIC VARIABLES, GAME SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const fps = 60;
var width = 640;
var height = 640;
var block_size = 32;
var parallax_speed = 0.15;
var padding = 200; // scroll padding around player
var terminal_velocity = 6;
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
    speed: 4,
    jumpheight: 8,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false,
    color:'#E6AC27'
},

keys = [],
friction = 0.75,
gravity = 0.4,
colliders = [],
objects = [],
powerup = [],
enemies = [];
running = false,
particles = [];

// LEVEL LOADER
function load_level(n){
    keys = [];
    colliders = [];
    objects = [];
    powerup = [];
    enemies = [];
    particles = [];
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


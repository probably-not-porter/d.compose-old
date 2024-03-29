// INTERNAL VARS
score = 0;
jump_reset = true;
parallax_counter = 0;
function starting_offset(){
    scroll_right(player.x - (width / 2));
    player.x = width / 2;
    scroll_down(player.y - (height / 2));
    player.y = height / 2;
}
// EXTERNAL FUNCTIONS
function engine_update() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    update_background()
    update_enemies();
    update_objects("background");
    update_player();
    update_objects("foreground");
    
    update_powerups();
    update_particles();
    update_menu();

    
    // draw text
    document.getElementById('score').innerText = "Percent decomposed: " + score + "%"
    if (running == true){
        setTimeout(() => {
            requestAnimationFrame(engine_update);
        }, 1000 / fps);
    }
}

// ADD 5 automatically
particle_firefly()
particle_firefly()
particle_firefly()
particle_firefly()
particle_firefly()


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
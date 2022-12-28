function update_player(){
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded && jump_reset) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.jumpheight;//how high to jump
            jump_reset = false;
        }
    }else{
        jump_reset = true;
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
    player.velX *= friction;
    player.velY += gravity;
    player.grounded = false;

    // terminal velocity
    if (player.velY > terminal_velocity){player.velY = terminal_velocity}

    // SCROLL SCENE AROUND PLAYER
    if (player.x + padding >= width && player.velX > 0){
        scroll_right(player.velX);
        player.x = player.x - player.velX;
    }
    if (player.x - padding <= 0 && player.velX < 0){
        scroll_left(-1 *player.velX);
        player.x = player.x - player.velX;
    }
    if (player.y + padding >= height && player.velY > 0){
        if (player.velY > 1) {scroll_down(player.velY);}
        else { scroll_down(1); }
        player.y = player.y - player.velY
    }
    if (player.y - padding <= 0 && player.velY < 0){
        scroll_up(-1*(player.y - padding) / 10);
        player.y = player.y - (player.y - padding) / 10
    }

    // check score
    obj_score = 0;
    full_score = 0;
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].scorable){
            full_score += 1;
            if (objects[i].state == 'infected'){
                obj_score += 1 * objects[i].val / 100;
            }
        }
    }
    score = Math.round(obj_score / full_score * 100 * 10) / 10;

    // check all box colliders for level
    for (var i = 0; i < colliders.length; i++) {//print colliders
        var dir = colCheck(player, colliders[i]);
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY = 0; // TODO: sus
        }
    }
    if(player.grounded){ player.velY = 0; }
    player.x += player.velX;
    player.y += player.velY;

    ctx.fill();//Draw charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
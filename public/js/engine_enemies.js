// enemies
function update_enemies(){
    for (var i = 0; i < enemies.length; i++){
        // check for player collision
        var dir = colCheck(enemies[i], player);
        if (dir != null){
            load_level(0)
            particles = [];
            // ADD 5 automatically
            particle_firefly()
            particle_firefly()
            particle_firefly()
            particle_firefly()
            particle_firefly()
        }
        
        enemies[i].velX *= friction;
        
        enemies[i].grounded = false;
        
        // check all box colliders for level
        for (var j = 0; j < colliders.length; j++) {//print colliders
            var dir = colCheck(enemies[i], colliders[j]);

            

            if (dir === "l") {
                enemies[i].velX = 0;
                enemies[i].jumping = false;
                if (player.y > enemies[i].y){
                    //enemies[i].velY = 10;
                }
                else{
                    enemies[i].velY = -0.2;
                }
            }else if (dir === "r") {
                enemies[i].velX = 0;
                enemies[i].jumping = false;
            }else if (dir === "b") {
                enemies[i].grounded = true;
                enemies[i].jumping = false;
                if (player.x > enemies[i].x){
                    enemies[i].velX = 0.2;
                }
                else{
                    enemies[i].velX = -0.2;
                }
            } else if (dir === "t") {
                enemies[i].velY = 0; // TODO: sus
            } else if (dir == null) {
                enemies[i].velY = 1; // TODO: sus
            }
        }
        for (var j = 0; j < objects.length; j++) {
            if(colSoftCheck(enemies[i], objects[j]) == true){
                if (objects[j].state == 'infected'){
                    if (objects[j].val >= 0){
                        objects[j].val -= 0.1;
                    }
                }
            }
        }
        
        if(enemies[i].grounded){
            enemies[i].velY = 0;
        }
        
        enemies[i].x += enemies[i].velX;
        enemies[i].y += enemies[i].velY;
        ctx.fillStyle = enemies[i].color;


        
        if (enemies[i].velX > 0){
            var spr = document.getElementById('snail2');
            ctx.drawImage(spr, enemies[i].x, enemies[i].y,enemies[i].width,enemies[i].height);
        }else{
            var spr = document.getElementById('snail');
            ctx.drawImage(spr, enemies[i].x, enemies[i].y,enemies[i].width,enemies[i].height);
        }
        
    }
}
// INTERNAL VARS
particles = [

]
score = 0;
jump_reset = true;

// EXTERNAL FUNCTIONS
function engine_update() {
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded && jump_reset) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 4;//how high to jump
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
  
  	

    

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img_background, 0, 0,640,640);
    ctx.beginPath();

    player.velX *= friction;
    player.velY += gravity;
    player.grounded = false;
    
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

    // enemies
    for (var i = 0; i < enemies.length; i++){
        // check for player collision
        var dir = colCheck(enemies[i], player);
        if (dir != null){
            var_load(2)
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
                    enemies[i].velY = 10;
                }
                else{
                    enemies[i].velY = -0.2;
                }
            }else if (dir === "r") {
                enemies[i].velX = 0;
                enemies[i].jumping = false;
                if (player.y > enemies[i].y){
                    enemies[i].velY = 0.2;
                }
                else{
                    enemies[i].velY = -0.2;
                }
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
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    }

    // OBJECTS
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].layer == "background" && objects[i].state != "destroyed"){
            var spr = document.getElementById(objects[i].sprite);
            ctx.drawImage(spr, objects[i].x, objects[i].y,objects[i].width,objects[i].height);
            
            if(colSoftCheck(player, objects[i]) == true){
                objects[i].val = 100;
                if (objects[i].state == 'normal'){
                    console.log("test");
                    objects[i].state = 'infected';
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_ring();
                }
            }
        }else if (objects[i].layer == "loader"){
            if(colSoftCheck(player, objects[i]) == true){
                var_load(objects[i].state);
            }
        }
    }
  
    ctx.fill();//Draw charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // OBJECTS
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].layer == "foreground" && objects[i].state != "destroyed"){
            var spr = document.getElementById(objects[i].sprite);
            ctx.drawImage(spr, objects[i].x, objects[i].y,objects[i].width,objects[i].height);
            
            if(colSoftCheck(player, objects[i]) == true){
                if (objects[i].state == 'normal'){
                    console.log("test");
                    objects[i].state = 'infected';
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_ring();
                }
            }
        }
    }
    
    //draw powerup stuff 
    for(var j = 0; j < powerup.length; j++){
      ctx.save();
      var cx = powerup[j].x + 0.5 * powerup[j].width,   // x of shape center
      cy = powerup[j].y + 0.5 * powerup[j].height; //y of shape center
      ctx.translate(cx, cy);  //translate to center of shape
      ctx.rotate( (Math.PI / 180) * 45);//rotate 25 degrees.
      if(powerup[j].effect  === 'tele'){
        ctx.rotate( (Math.PI / 180) * powerup[j].rotate);//rotate 25 degrees.
        powerup[j].rotate = (Math.PI / 180) * powerup[j].rotate;
      }
      ctx.translate(-cx, -cy);            //translate center back to 0,0
      ctx.fillStyle = powerup[j].color;
      ctx.fillRect(powerup[j].x, powerup[j].y, powerup[j].width, powerup[j].height);
      ctx.restore();
      
      //powerup collision
      if(colCheck(player, powerup[j])!==null){//touched power up!
        if(powerup[j].effect==='gravity'){
          gravity= 0.4;//decrease gravity
          player.speed = 4;
          player.color = 'white';
        }
        else if (powerup[j].effect==='shrink'){
          player.width= 10;
          player.height= 10;
          player.speed = 5;
        }
        else if (powerup[j].effect==='tele'){
          player.x=powerup[j].px;
          player.y=powerup[j].py;
        }
        else if (powerup[j].effect==='win'){
          var r = confirm("You win! Play again?");
          if (r == false) {
               player.x=200;
               player.y=200;
          } else {
               window.location.href = window.location.href;
          }
        }
        //if(powerup[j].stay!==true)
        //powerup[j].width=0;//make power up go away
      }
    }
    //powerup stuff

    // draw particles
    for (j = 0; j < particles.length; j++){
        if (particles[j].age <= particles[j].death) {
            if (particles[j].type == "ring"){
                particles[j].age += 1;
                particles[j].diameter += 1;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,255,0," + ((particles[j].death - particles[j].age) / particles[j].death) + ")";
                ctx.lineWidth = 1;
                ctx.arc(particles[j].x, particles[j].y, particles[j].diameter, 0, 2 * Math.PI);
                ctx.stroke();
            }
            else if(particles[j].type == "firefly") {
                var spr = document.getElementById("particle1");
                particles[j].x += Math.cos(particles[j].motion) / 3;
                particles[j].y += Math.sin(particles[j].motion) / 3;
                particles[j].motion += (Math.random() - 0.5) / 6;
                if (particles[j].x < -50) { particles[j].motion = 0}
                else if (particles[j].x > width + 50) { particles[j].motion = Math.PI}
                else if (particles[j].y > height + 50) { particles[j].motion = (Math.PI * 3) / 2}
                else if (particles[j].y < -50) { particles[j].motion = Math.PI / 2}

                ctx.drawImage(spr, particles[j].x, particles[j].y, 16, 16);
            }
            else if(particles[j].type == "mushroom") {
                var spr = document.getElementById("particle2");
                particles[j].diameter += 1;
                let size = particles[j].diameter / 100;
                if (size > particles[j].motion) { size = particles[j].motion; }
                ctx.drawImage(spr, particles[j].x - 8 * size, particles[j].y - 16 * size, 16 * size * (objects[particles[j].parent].val / 100), 16 * size * (objects[particles[j].parent].val / 100));

            }
            
        }
        
    }
    // clean up particles
    for (j = particles.length - 1; j > -1; j--){
        if (particles[j].age != -1){
            if (particles[j].age > particles[j].death){
                particles.splice(j, 1); // 2nd parameter means remove one item only
            }
        }
    }
    // draw text
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff"
    ctx.fillText(score + "%", 20, 30);

    requestAnimationFrame(engine_update);
}
// INTERNAL ONLY
function particle_ring(){
    particles.push({
        type: "ring",
        age: 0,
        death: 50,
        diameter: 0,
        x: player.x + player.width / 2,
        y: player.y + player.height / 2,
    })
}
function particle_firefly(){
    particles.push({
        type: "firefly",
        age: -1,
        death: 0,
        diameter: 5,
        x: Math.random() * (width - 50) + 50,
        y: Math.random() * (height - 50) + 50,
        motion: Math.random() * 2 * Math.PI
    })
}
function particle_mushroom(x1,y1,x2,y2, parent){
    particles.push({
        type: "mushroom",
        age: -1,
        death: 0,
        diameter: 5,
        parent: parent,
        x: getRandomArbitrary(x1, x2),
        y: getRandomArbitrary(y1, y1 + 16),
        motion: Math.random() / 2 + 0.5
    })
    console.log(particles);
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

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
function colSoftCheck(shapeA, shapeB) {
    if (
        shapeA.x + shapeA.width >= shapeB.x &&
        shapeA.x <= shapeB.x + shapeB.width &&
        shapeA.y + shapeA.height >= shapeB.y &&
        shapeA.y <= shapeB.y + shapeB.height
    ){
        return true
    }else{
        return false
    }
}

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
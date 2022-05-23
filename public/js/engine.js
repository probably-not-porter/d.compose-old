// INTERNAL VARS
particles = [

]
score = 0;

// EXTERNAL FUNCTIONS
function engine_update() {
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 4;//how high to jump
        }
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
                obj_score += 1;
            }
        }
    }
    score = Math.floor(obj_score / full_score * 100);
  
  	

    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img_background, 0, 0,640,640);
    ctx.beginPath();
    
    player.grounded = false;
    
    // check all box colliders for level
    for (var i = 0; i < colliders.length; i++) {//print colliders
        ctx.fillStyle = "rgba(0,0,0,0.1)"        // colliders[i].color;
        ctx.rect(colliders[i].x, colliders[i].y, colliders[i].width, colliders[i].height);
        
        var dir = colCheck(player, colliders[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1; // TODO: sus
        }
    }
    
    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
  
    ctx.fill();//Draw charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // OBJECTS
    for (var i = 0; i < objects.length; i++) {
        var spr = document.getElementById(objects[i].sprite);
        ctx.drawImage(spr, objects[i].x, objects[i].y,objects[i].width,objects[i].height);
        if (objects[i].state == 'infected'){
            ctx.fillStyle = "rgba(14,106,14,0.3)"        // colliders[i].color;
            ctx.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
        if(colSoftCheck(player, objects[i]) == true){
            if (objects[i].state == 'normal'){
                objects[i].state = 'infected';
                console.log('test')
                particle_ring();
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
    console.log("created particle ring");
    particles.push({
        type: "ring",
        age: 0,
        death: 50,
        diameter: 5,
        x: player.x + block_size /2,
        y: player.y + block_size /2,
    })
}
function particle_firefly(){
    console.log("created particle firefly");
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
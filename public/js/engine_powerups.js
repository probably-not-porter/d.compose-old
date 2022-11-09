function update_powerups(){
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
}
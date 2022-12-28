// OBJECTS
function update_objects(layer) {
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].layer == layer && objects[i].state != "destroyed"){
            var spr = document.getElementById(objects[i].sprite);
            if (objects[i].val == 100 && objects[i].altsprite){
                spr = document.getElementById(objects[i].altsprite);
            }
            ctx.drawImage(spr, objects[i].x, objects[i].y,objects[i].width,objects[i].height);
            
            if(colSoftCheck(player, objects[i]) == true){
                objects[i].val = 100;
                if (objects[i].state == 'normal'){
                    objects[i].state = 'infected';
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_mushroom(objects[i].x,objects[i].y,objects[i].x + objects[i].width,objects[i].y + objects[i].height,i); // create mushroom particles on infected block.
                    particle_ring();
                }
            }
        }else if (objects[i].layer == "loader"){
            if(colSoftCheck(player, objects[i]) == true){
                load_level(objects[i].state);
            }
        }
    }
}
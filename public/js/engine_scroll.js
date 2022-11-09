function scroll_right(n){
    for (x = 0; x < objects.length; x++){
        objects[x].x  = objects[x].x - n;
    }
    for (x = 0; x < colliders.length; x++){
        colliders[x].x  = colliders[x].x - n;
    }
    for (x = 0; x < particles.length; x++){
        particles[x].x  = particles[x].x - n;
    }
}
function scroll_left(n){
    for (x = 0; x < objects.length; x++){
        objects[x].x  = objects[x].x + n;
    }
    for (x = 0; x < colliders.length; x++){
        colliders[x].x  = colliders[x].x + n;
    }
    for (x = 0; x < particles.length; x++){
        particles[x].x  = particles[x].x + n;
    }
}
function scroll_up(n){
    for (x = 0; x < objects.length; x++){
        objects[x].y  = objects[x].y + n;
    }
    for (x = 0; x < colliders.length; x++){
        colliders[x].y  = colliders[x].y + n;
    }
    for (x = 0; x < particles.length; x++){
        particles[x].y  = particles[x].y + n;
    }
}
function scroll_down(n){
    for (x = 0; x < objects.length; x++){
        objects[x].y  = objects[x].y - n;
    }
    for (x = 0; x < colliders.length; x++){
        colliders[x].y  = colliders[x].y - n;
    }
    for (x = 0; x < particles.length; x++){
        particles[x].y  = particles[x].y - n;
    }
}
function update_particles(){
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
            else if(particles[j].type == "mushroom2") {
                var spr = document.getElementById("mush1");
                particles[j].diameter += 1;
                let size = particles[j].diameter / 100;
                if (size > particles[j].motion) { size = particles[j].motion; }
                ctx.drawImage(spr, particles[j].x - 8 * size, particles[j].y - 64 * size, 32 * size * (objects[particles[j].parent].val / 100), 64 * size * (objects[particles[j].parent].val / 100));

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
    seed = Math.random();
    if (seed < 0.95){
        particles.push({
            type: "mushroom",
            age: -1,
            death: 0,
            diameter: 5,
            parent: parent,
            x: getRandomArbitrary(x1, x2),
            y: getRandomArbitrary(y1, y1 + 2),
            motion: Math.random() / 2 + 0.5
        })
    }
    else{
        particles.push({
            type: "mushroom2",
            age: -1,
            death: 0,
            diameter: 5,
            parent: parent,
            x: getRandomArbitrary(x1, x2),
            y: getRandomArbitrary(y1, y1 + 2),
            motion: Math.random() / 2 + 0.5
        })
    }
}
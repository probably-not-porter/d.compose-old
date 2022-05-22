let l2 = {  
    playerx: 320,
    playery: 200,
    powerup: [],
    colliders: [],
    objects: []
}
for (j = 0;j < width / block_size; j++){
    l2.objects.push({
        x: j*block_size,
        y: 608,
        width: 32,
        height: 32,
        sprite: "block1",
        state: 'normal',
        scorable: true
    })
}
l2.colliders = level_border.concat(l2.colliders);
levels[2] = l2
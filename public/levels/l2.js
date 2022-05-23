let l2 = {  
    playerx: 312,
    playery: 50,
    powerup: [],
    colliders: [
        {
            x: 320 - 32,
            y: 102,
            width: 64,
            height: 16,
            color: null
        }
    ],
    objects: [
        {
            x: 320 - 32,
            y: 100,
            width: 64,
            height: 32,
            sprite: "plat1",
            state: 'abnormal',
            scorable: false
        }
    ]
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
l2.colliders = level_border.concat(l2.colliders); // add screen border colliders
levels[2] = l2
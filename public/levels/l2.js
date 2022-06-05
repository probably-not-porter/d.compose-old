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
        },
        { // starting platform decor
            x: 480 -32,
            y: 608 - 32,
            width: 32,
            height: 32,
            color: null
        }
    ],
    objects: [
        { // starting platform
            x: 320 - 32,
            y: 100,
            width: 64,
            height: 32,
            sprite: "plat1",
            state: 'abnormal',
            layer: 'foreground',
            scorable: false
        },
        { // starting platform decor
            x: 320,
            y: 40,
            width: 64,
            height: 64,
            sprite: "mush2",
            state: 'abnormal',
            layer: 'foreground',
            scorable: false
        },
        {
            x: 480 -32,
            y: 608 - 32,
            width: 32,
            height: 32,
            sprite: "block1",
            state: 'normal',
            layer: 'background',
            scorable: true,
        }
        
    ],
    enemies: [
        {
            x: 500,
            y: 608 - 15,
            width: 16,
            height: 16,
            speed: 1,
            velX: 0,
            velY: 0,
            jumping: false,
            grounded: false,
            color:'#111'
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
        layer: 'background',
        scorable: true,
    })
}
l2.colliders = level_border.concat(l2.colliders); // add screen border colliders
levels[2] = l2


/*
next level loader
{
    x: 600,
    y: 600,
    width: 64,
    height: 64,
    sprite: null,
    state: 1,
    layer: 'loader',
    scorable: false
}
*/
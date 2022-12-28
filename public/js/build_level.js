
function build_level(arr, block_size){

    let level = {  
        playerx: 312,
        playery: 50,
        powerup: [],
        colliders: [
        ],
        objects: [
        ],
        enemies: [
        ]
    }

    for (y = 0; y < arr.length; y++){ // for each vertical line of the level arr
        line = arr[y].split(" ");
        for (x = 0; x < line.length; x++){ // for each horizontal symbol in line
            // add objects based on symbol
            switch (line[x].toLowerCase()){
                case "##":
                    break;

                case "%%":                  // PLAYER
                    level.playerx = x * block_size;
                    level.playery = y * block_size;
                    break;

                case "b1":                  // BLOCK 1
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "block1",
                        altsprite: "block2",
                        state: 'normal',
                        layer: 'background',
                        scorable: true,
                    });
                    level.colliders.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        color: null
                    });
                    break;

                case "b3":                  // BLOCK 3
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "dirt1",
                        state: 'abnormal',
                        layer: 'background',
                        scorable: false,
                    });
                    level.colliders.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        color: null
                    });
                    break;

                case "b4":                  // BLOCK 4
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "dirt2",
                        state: 'abnormal',
                        layer: 'background',
                        scorable: false,
                    });
                    break;
                
                case "tb":                  // PILLAR BOTTOM
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pillarb",
                        state: 'abnormal',
                        layer: 'background',
                        scorable: true,
                    });
                    level.colliders.push({
                        x: x * block_size + 2,
                        y: y * block_size,
                        width: 28,
                        height: 32,
                        color: null
                    });
                    break;

                case "tm":                  // PILLAR MIDDLE
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pillarm",
                        state: 'abnormal',
                        layer: 'background',
                        scorable: true,
                    });
                    level.colliders.push({
                        x: x * block_size + 2,
                        y: y * block_size,
                        width: 28,
                        height: 32,
                        color: null
                    });
                    break;
                
                case "tt":                  // PILLAR top
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pillart",
                        state: 'abnormal',
                        layer: 'background',
                        scorable: true,
                    });
                    level.colliders.push({
                        x: x * block_size + 2,
                        y: y * block_size,
                        width: 28,
                        height: 32,
                        color: null
                    });
                    break;

                case "pl":                  // PLATFORM LEFT
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pl",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    level.colliders.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 16,
                        color: null
                    });
                    break;

                case "pr":                  // PLATFORM RIGHT
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pr",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    level.colliders.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 16,
                        color: null
                    });
                    break;

                case "pm":                  // PLATFORM RIGHT
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "pm",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    level.colliders.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 16,
                        color: null
                    });
                    break;

                case "d1":                  // decoration 1
                    level.objects.push({ // starting platform decor
                        x: x * block_size,
                        y: y * block_size - block_size,
                        width: 32,
                        height: 64,
                        sprite: "mush1",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    break;

                case "d2":                  // decoration 2
                    level.objects.push({ // starting platform decor
                        x: x * block_size,
                        y: y * block_size - block_size,
                        width: 64,
                        height: 64,
                        sprite: "mush2",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    break;
                
                case "g1":                  // decoration 2
                    level.objects.push({ // starting platform decor
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "grass1",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    break;
                
                case "g2":                  // decoration 2
                    level.objects.push({ // starting platform decor
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "grass2",
                        state: 'abnormal',
                        layer: 'foreground',
                        scorable: false
                    });
                    break;
                default:
                    console.error('unrecognized symbol! Treat as empty.');
            }
        }
    }

    //level.colliders = level.colliders.concat(level_border)
    return level
}


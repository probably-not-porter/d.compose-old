
function build_level(arr, block_size){
    let level_border = [
        {
            x: 0,
            y: 0 - block_size,
            width: block_size * arr[0].length,
            height: block_size,
            color: null
        },
        {
            x: 0,
            y: height,
            width: block_size * arr[0].length,
            height: block_size,
            color: null
        },
        {
            x: 0 - block_size,
            y: 0,
            width: block_size,
            height: block_size * arr.length,
            color: null
        },
        {
            x: width,
            y: 0,
            width: block_size,
            height: block_size * arr.length,
            color: null
        }
    ];

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

                case "b1":                  // BLOCK 1
                    level.objects.push({
                        x: x * block_size,
                        y: y * block_size,
                        width: 32,
                        height: 32,
                        sprite: "block1",
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
                default:
                    console.error('unrecognized symbol! Treat as empty.');
            }
        }
    }

    level.colliders = level.colliders.concat(level_border)
    return level
}


let l1 = {  
    playerx: 350,
    playery: 200,
    powerup: [
        {
            x: 810,
            y: 250,
            width: 20,
            height: 20,
            color: '#BF4D28',
            effect: 'shrink'
        },
        {
            x: 400,
            y: 150,
            width: 20,
            height: 20,
            color: '#BF4D28',
            effect: 'gravity'
        },
        {
            x: -15,
            y: 88,
            width: 20,
            height: 20,
            color: '#222',
            effect: 'tele',
                  rotate: 20,
            px: 20,//where they get teleported
            py: 370,
            stay: true
        },
        {
            x: 60,
            y: 365,
            width: 20,
            height: 20,
            color: '#2A5D77',
            effect: 'win',
            stay: true
        }
    ],
    colliders: [
        {//box on left
            x: 0,
            y: height/4+10,
            width: 10,
            height: height,
            color: 'green'
        },
        {//box on left
            x: 0,
            y: 0,
            width: 10,
            height: height/4-15,
            color: 'green'
        },
        {//box for the ground
            x: 0,
            y: height - 10,
            width: width,
            height: 50,
            color: 'orange'
        },
        {//box on right
            x: width - 10,
            y: 0,
            width: 50,
            height: height,
            color: 'yellow'
        },
        {
            x: 290,
            y: 200,
            width: 260,
            height: 10,
            color: 'blue'
        },
        {
            x: 590,
            y: 200,
            width: 80,
            height: 10,
            color: 'blue'
        },
        {
            x: 120,
            y: 250,
            width: 150,
            height: 10,
            color: 'red'
        },
        {
            x: 220,
            y: 300,
            width: 80,
            height: 10,
            color: 'black'
        },
        {
            x: 340,
            y: 350,
            width: 90,
            height: 10,
            color: '#655643'
        },
        {
            x: 740,
            y: 300,
            width: 160,
            height: 10,
            color: '#655643'
        },
        {
            x: 0,
            y: 350,
            width: 90,
            height: 10,
            color: '#655643'
        },
        {
            x: 90,
            y: 350,
            width: 10,
            height: 50,
            color: '#655643'
        }
    ]
}
levels[1] = l1
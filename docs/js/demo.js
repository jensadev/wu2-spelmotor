/*
 * Detta är en förenklad version av map.js där du beskriver färger och annat för kartans
 * uppbyggnad.
 */

 // I levelKey anger du vilka färger som ska mappas till saker i spelet
const levelKey = {
    "0,0,0": "empty",
    "255,255,0": "grass",
    "0,255,0": Player,
    "255,0,100": Item
};

// groundtypes är en array med de statiska kartbitarna som spelaren kolliderar med
const groundTypes = ["grass"];

/*
 * Här anger du alla bilder/kartor/sprites som spelet ska använda
 * För statiska bilder och kartan räcker det med att bara ange en källa
 * För sprites så anger du källbildens storlek (eller hur stor del av en bild du vill använda)
 * ett offset för vars bilden börjar på x och y utifrån källan och sist hur stor själva spriten är 
 */
let sources = {
    player: {
        src: 'img/sprites/cavedude_side.png',
        srcWidth: 1248,
        srcHeight: 186,
        width: 96,
        height: 96,
        offsetX: 0,
        offsetY: 512
    },
    item: {
        src: 'img/sprites/cavedude_side.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 192,
        offsetY: 480
    },
    grass: {
        src: 'img/sprites/cavedude_side.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 64,
        offsetY: 0
    },
    map1: {src: 'img/maps/demo.png'}
};

// maps arrayen innehåller dina karter
let maps = [sources.map1];

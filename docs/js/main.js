let width = 1024;
let height = 768;
let scale = 32;

const levelKey = {
    "0,0,0": "empty",
    "255,255,0": "grass",
    "255,0,0": Lava,
    "0,255,0": Player,
    "0,255,255": Item,
    "255,0,255": "ground",
    "0,0,255": "grass"
};

let images = [];
let player;

let offCanvas = document.createElement('canvas');
let offCtx = offCanvas.getContext('2d');

const sources = {
    map: 'img/maps/map1.png',
    grass: 'img/grass.png',
    lava: 'img/lava.png',
    ground: 'img/ground.png',
    player: 'img/player.png',
    item: 'img/item.png'
};

function loadImages(sources, callback) {
    let loadedImages = 0;
    let numImages = 0;
    for(let src in sources) {
        numImages++;
    }
    for(let src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

let game;

loadImages(sources, function() {
    game = runGame(images.map);
});

async function runGame(plans) {
    let status = await runLevel(new Level(plans, offCtx, levelKey));
}

function runLevel(level) {
    let stage = document.getElementById('stage');
    stage.setAttribute("style", "width:" + width + "px;");
    let display = new Canvas(width, height, stage, level);
    let state = State.start(level);
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
}

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "d"]);
let gravity = 30;

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
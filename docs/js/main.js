let width = 1024;
let height = 768;
let scale = 32;

let images = [];

let offCanvas = document.createElement('canvas');
let offCtx = offCanvas.getContext('2d');
let body = document.getElementsByTagName("body")[0];

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
        images[src].src = sources[src].src;
        sources[src].image = images[src];
    }
}

loadImages(sources, function() {
    // double preload profit?
    for(let src in sources) {
        if (sources[src].repeat) {
            console.log(src)
            offCanvas.width = sources[src].srcWidth;
            offCanvas.height = sources[src].srcHeight;
            offCtx.drawImage(sources[src].image, sources[src].offsetX, sources[src].offsetY, sources[src].srcWidth, sources[src].srcHeight, 0, 0, sources[src].srcWidth, sources[src].srcHeight);
            let a = new Image();
            a.src = offCanvas.toDataURL('png');

            offCanvas.width = width;
            offCanvas.height = sources[src].srcHeight;

            let pattern = offCtx.createPattern(a, sources[src].repeat);
            offCtx.fillStyle = pattern;
            offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);
            let b = new Image();
            b.src = offCanvas.toDataURL('png');

            sources[src].image = b;
            
        } else if (sources[src].offsetX || sources[src].offsetY) {
            offCanvas.width = sources[src].srcWidth;
            offCanvas.height = sources[src].srcHeight;
            offCtx.drawImage(sources[src].image, sources[src].offsetX, sources[src].offsetY, sources[src].srcWidth, sources[src].srcHeight, 0, 0, sources[src].srcWidth, sources[src].srcHeight);
            // images[src].src = offCanvas.toDataURL('png');
            let a = new Image();
            a.src = offCanvas.toDataURL('png');
            sources[src].image = a;
        }
    }
    runGame(sources.map.image);
});

async function runGame(plans) {
    let offMapCtx = new OffscreenCanvas(sources.map.image.width, sources.map.image.height).getContext('2d');
    let status = await runLevel(new Level(plans, offMapCtx, levelKey));
    if (status == "won") {
        console.log("You won");
    } else if (status == "lost") {
        console.log("Slain by lava");
    }
}

function runLevel(level) {
    console.log(level)
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

let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "d", "g"]);
let gravity = 15;

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
class Canvas {
    constructor(width, height, parent, level)
    {
        this.width = Math.min(width, level.width * scale);
        this.height = Math.min(height, level.height * scale);

        this.bgLayer = document.createElement("canvas");
        this.bgLayer.width = this.width;
        this.bgLayer.height = this.height;
        this.bgCtx = this.bgLayer.getContext("2d");

        this.mapLayer = document.createElement("canvas");
        this.mapLayer.width = this.width;
        this.mapLayer.height = this.height;
        this.mapCtx = this.mapLayer.getContext("2d");

        this.actorsLayer = document.createElement("canvas");
        this.actorsLayer.width = this.width;
        this.actorsLayer.height = this.height;
        this.actorsCtx = this.actorsLayer.getContext("2d");

        parent.appendChild(this.bgLayer);
        parent.appendChild(this.mapLayer);
        parent.appendChild(this.actorsLayer);

        this.flipPlayer = false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.width / scale,
            height: this.height / scale
        };

        this.prevX = 0;
        this.prevY = 0;
    }

    updateViewport = function(state)
    {
        let view = this.viewport;
        let margin = view.width / 3;
        let player = state.player;
        let center = player.pos.plus(player.size.times(0.5));

        if (center.x < view.left + margin) {
            view.left = Math.max(center.x - margin, 0);
        } else if (center.x > view.left + view.width - margin) {
            view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
        }
        
        if (center.y < view.top + margin) {
            view.top = Math.max(center.y - margin, 0);
        } else if (center.y > view.top + view.height - margin) {
            view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
        }
    }


    drawMap = function(level)
    {
        let { left, top, width, height } = this.viewport;
        let xStart = Math.floor(left);
        let xEnd = Math.ceil(left + width);
        let yStart = Math.floor(top);
        let yEnd = Math.ceil(top + height);
      
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let tile = level.layout[y][x];
                if (tile !== "empty") {
                    let screenX = (x - left) * scale;
                    let screenY = (y - top) * scale;

                    //console.log(screenX, screenY)

                    //let tileX = tile == "lava" ? scale : 0;
                    if(tile === "ground") {
                        this.mapCtx.drawImage(images.ground, screenX, screenY, scale, scale);
                    } else if (tile === "grass") {
                        this.mapCtx.drawImage(images.grass, screenX, screenY, scale, scale);
                    }
                }
                // this.cx.drawImage(otherSprites,
                //                 tileX,         0, scale, scale,
                //                 screenX, screenY, scale, scale);
            }
        }
    }

    syncState = function(state)
    {
        this.updateViewport(state);
        this.clearDisplay(state.status);
        this.drawMap(state.level);
        this.drawActors(state.actors);
    }

    clear()
    {
        this.bgLayer.remove();
        this.mapLayer.remove();
        this.actorsLayer.remove();
    }

    clearDisplay = function() {
        if (status == "won") {
            this.bgCtx.fillStyle = "rgb(68, 191, 255)";
        } else if (status == "lost") {
            this.bgCtx.fillStyle = "rgb(44, 136, 214)";
        } else {
            this.bgCtx.fillStyle = "rgb(52, 166, 251)";
        }
        this.bgCtx.fillRect(0, 0, this.width, this.height);
        this.mapCtx.clearRect(0, 0, this.width, this.height);
    }

    drawActors = function(actors)
    {
        for (let actor of actors) {
            let width = actor.size.x * scale;
            let height = actor.size.y * scale;
            let x = (actor.pos.x - this.viewport.left) * scale;
            let y = (actor.pos.y - this.viewport.top) * scale;
            if (actor.type == "player") {
                this.drawPlayer(actor, x, y, width, height);
            } else {
//                let tileX = (actor.type == "coin" ? 2 : 1) * scale;
                this.mapCtx.drawImage(actor.type == "lava" ? images.lava : images.item, x, y, width, height);          
            }
        }
    }

    drawPlayer = function(player, x, y, width, height)
    {
        // let playerOverlap = 4;
        // width += playerOverlap * 2;
        // // height += playerOverlap * 2;
        // x -= playerOverlap;
        // y -= playerOverlap;

        if (player.speed.x != 0) {
            this.flipPlayer = player.speed.x < 0;
        }

        let tile = 1;
        if (player.speed.y != 0) {
            tile = 3;
        } else if (player.speed.x != 0) {
            tile = Math.floor(Date.now() / 60) % 3;
        }

        this.actorsCtx.clearRect(this.prevX , this.prevY , width, height);
        this.actorsCtx.save();
        if (this.flipPlayer) {
            flipHorizontally(this.actorsCtx, x + width / 2);
        }
        let tileX = tile * 32;
        
        this.actorsCtx.drawImage(images.player, tileX, 0, width, height, x, y, width, height);
        this.actorsCtx.restore();
        this.prevY = y;
        this.prevX = x;
    }
}
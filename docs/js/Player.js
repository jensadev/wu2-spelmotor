class Player
{
    constructor(pos, speed)
    {
        this.pos = pos;
        this.size = new Vector(1, 1);
        this.speed = speed;
        this.xOverlap = 4;
        this.xSpeed = 8;
        this.ySpeed = 16;
    }

    static create(pos) {
        return new Player(pos.plus(new Vector(0, -1)), new Vector(0, 0));
    }

    get type()
    { 
        return "player";
    }

    update = function(time, state, keys)
    {
        let currentXSpeed = 0;
        if (keys.ArrowLeft || keys.a) currentXSpeed -= this.xSpeed;
        if (keys.ArrowRight || keys.d) currentXSpeed += this.xSpeed;
        let pos = this.pos;
        let movedX = pos.plus(new Vector(currentXSpeed * time, 0));

        if (!state.level.touches(movedX, this.size, "grass")) {
            pos = movedX;
        }
      
        let currentYSpeed = this.speed.y + time * gravity;
        let movedY = pos.plus(new Vector(0, currentYSpeed * time));

        if (!state.level.touches(movedY, this.size, "grass")) {
            pos = movedY;
        } else if (keys.ArrowUp || keys.w && currentYSpeed > 0) {
            currentYSpeed = -this.ySpeed;
        } else {
            currentYSpeed = 0;
        }
        return new Player(pos, new Vector(currentXSpeed, currentYSpeed));
    }
}
class Enemy
{
    constructor(pos, speed, delta, prevX, prevY)
    {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vector(2, 2);
        this.delta = delta;
        this.xSpeed = 3;
        this.prevX = prevX;
        this.prevY = prevY;
    }

    static create(pos)
    {
        return new Enemy(pos.plus(new Vector(0, -1)), new Vector(2, 0), 1);
    }

    get type()
    { 
        return "enemy";
    }

    collide = function(state)
    {
        let currentHealth = state.health - 3;
        console.log(currentHealth);
        if (currentHealth <= 0) {
            return new State(state.level, state.actors, "lost");
        }
        return new State(state.level, state.actors, state.status, state.score, state.rocks, currentHealth);
    }

    update = function(time, state)
    {
        let currentXSpeed = this.xSpeed * this.delta;
        let pos = this.pos;
        let movedX = pos.plus(new Vector(currentXSpeed * time, 0));
        let currentYSpeed = this.speed.y + time * gravity;
        let movedY = pos.plus(new Vector(0, currentYSpeed * time));

        if (!state.level.touches(movedX, this.size, ["clip", "grass", "ground", "platformC", "platformR", "platformL"])) {
            pos = movedX;
        } else {
            this.delta *= -1;
        }

        if (!state.level.touches(movedY, this.size, ["clip", "grass", "ground", "platformC", "platformR", "platformL"])) {
            pos = movedY;
        } else {
            currentYSpeed = 0;
        }

        return new Enemy(pos, new Vector(currentXSpeed, currentYSpeed), this.delta, this.prevX, this.prevY);
    }
}
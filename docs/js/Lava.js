class Lava
{
    constructor(pos, speed)
    {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vector(1, 1);
    }

    get type()
    {
        return "lava";
    }

    static create(pos) 
    {
        return new Lava(pos, new Vector(0, 0));
    }

    collide = function(state)
    {
        return new State(state.level, state.actors, "lost");
    }

    update = function(time, state)
    {
        // let newPos = this.pos.plus(this.speed.times(time));
        // if (!state.level.touches(newPos, this.size, "wall")) {
        //     return new Lava(newPos, this.speed, this.reset);
        // } else if (this.reset) {
        //     return new Lava(this.reset, this.speed, this.reset);
        // } else {
            return new Lava(this.pos, this.speed.times(1));
        // }
    }
    
}
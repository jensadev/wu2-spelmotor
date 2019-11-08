class Rock
{
    constructor(pos) {
        this.pos = pos;
        this.size = new Vector(0.8, 0.8);
    }

    get type()
    {
        return "rock";
    }

    static create(pos) 
    {
        return new Rock(pos);
    }

    collide = function(state)
    {
        return state;
    }

    update = function(time, state)
    {
        return new Rock(this.pos);
    }
    
}
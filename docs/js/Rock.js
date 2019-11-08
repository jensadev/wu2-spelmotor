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

    collide = function(state, keys)
    {
        if (keys.g) {
            console.log("GRAB ROCK ZOG ZOG");
            let filtered = state.actors.filter(a => a != this);
            return new State(state.level, filtered, state.status, state.score);
        }
        return state;
    }

    update = function(time, state)
    {
        return new Rock(this.pos);
    }
    
}
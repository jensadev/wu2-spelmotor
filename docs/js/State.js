class State
{
    constructor(level, actors, status, score) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.score = score;
    }
  
    static start(level)
    {
        return new State(level, level.startActors, "playing", 0);
    }
  
    get player()
    {
        return this.actors.find(a => a.type == "player");
    }

    update = function(time, keys)
    {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status, this.score);

        if (newState.status != "playing") return newState;
      
        let player = newState.player;

        if (this.level.touches(player.pos, player.size, "lava")) {
            console.log("lava")
            return new State(this.level, actors, "lost", this.score);
        }
      
        for (let actor of actors) {
            if (actor != player && overlap(actor, player)) {
                    newState = actor.collide(newState, keys);
            }
        }

        return newState;
    }
}
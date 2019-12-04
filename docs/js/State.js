class State
{
    constructor(level, actors, status, score, rocks) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.score = score;
        this.rocks = rocks;
        this.maxScore = actors.filter(x => x === Item).length;
    }
  
    static start(level)
    {
        return new State(level, level.startActors, "playing", 0, 0);
    }
  
    get player()
    {
        return this.actors.find(a => a.type == "player");
    }

    get enemies()
    {
        let temp = [];
        for (let actor of this.actors) {
            if (actor.type == "enemy") {
                temp.push(actor);
            }
        }
        return temp;
    }

    overlap = function(actor1, actor2)
    {
        return actor1.pos.x + actor1.size.x > actor2.pos.x &&
               actor1.pos.x < actor2.pos.x + actor2.size.x &&
               actor1.pos.y + actor1.size.y > actor2.pos.y &&
               actor1.pos.y < actor2.pos.y + actor2.size.y;
    }

    update = function(time, keys)
    {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status, this.score, this.rocks);

        if (newState.status != "playing") return newState;
      
        let player = newState.player;
        let enemies = newState.enemies;

        if (keys.Space && this.rocks > 0) {
            newState.rocks--;
            console.log(player.facing)
            if (player.facing == "right") {
                actors.push(Rock.create(player.pos, false, new Vector(10, 0)));
            } else {
                actors.push(Rock.create(player.pos, false, new Vector(-10, 0)));
            }
        }

        if (this.level.touches(player.pos, player.size, ["lava"])) {
            return new State(this.level, actors, "lost", this.score, 0);
        }

        for (let actor of actors) {
            if (actor != player && this.overlap(actor, player)) {
                    newState = actor.collide(newState, keys);
            } else if (actor.type == "rock") {
                // här luktar det tveksam kod
                for (let i = 0; i < enemies.length; i++) {
                    if(this.overlap(actor, enemies[i])) {
                        newState.actors = newState.actors.filter(a => a != enemies[i]);
                    }
                }
            }
        }

        return newState;
    }
}
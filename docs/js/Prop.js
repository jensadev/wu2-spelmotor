class Prop
{
    constructor(pos) {
        this.pos = pos;
        this.size = new Vector(1, 1);
    }

    get type()
    {
        return "prop";
    }

    static create(pos) 
    {
        return new Prop(pos);
    }

    update = function(time, state)
    {
        return new Prop(this.pos);
    }
    
}
class Plus{
    constructor(img){
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = random(0, 3);
        this.img = img;
    }

    display(){
        //stroke(0);
        //noFill();
        //ellipse(this.pos.x, this.pos.y, this.mass *20);
        image(this.img, this.pos.x, this.pos.y, this.mass*20, this.mass*20);
    }

    calculateForce(){
        let mouse = createVector(mouseX, mouseY);
        let d = mouse.sub(this.pos);
        d.mult(-.01); // map to repelling strength
        return d
    }

    stop(){
        this.vel.mult(0);
    }

    // physics functions
    applyForce(f){
        let force = p5.Vector.div(f, this.mass);
        this.acc.add(force);
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}
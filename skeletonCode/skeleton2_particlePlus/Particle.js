class Particle {
    constructor(x, y, particleSize){
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.r = particleSize;
        this.maxSpeed = 10;
        this.maxforce = 1;
    }

    behaviors(m){
        let arrive = this.arrive(this.target);
        let flee = this.flee(m);

        arrive.mult(1);
        flee.mult(5); 

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    applyForce(f){
        this.acc.add(f);
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    display(){
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r)

    }

    arrive(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        var speed = this.maxSpeed;
        if(d<100){
            speed = map(d, 0, sensitivity, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
        
    }

    flee(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        if(d<50){
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        }else{
            return createVector(0, 0);
        }
    } 
}
// Eva Philips
// June 28, 2019
// This code documents one potental output system for a S+G interactive screen
// References:
// 1. This code was largely based on Dan Shifmans Steering Text Paths video - https://editor.p5js.org/codingtrain/sketches/VDLbnxyQe



// variables
let particles = [];
let sensitivity = 80;
let particleSize = 20;


function setup(){
    // setup background
    let cvs = createCanvas(800, 800);
    cvs.center('horizontal');
    background(0);

    // create particles vertical particles
    for(let j=particleSize*2; j<height; j += particleSize*2){
        for(let i=3*width/8 + particleSize; i<5*width/8 + particleSize; i += particleSize*2){
            particles.push(new Particle(i, j, particleSize));
        }
    }

    // create left side particles
    for(m=particleSize*16; m<particleSize*26; m+= particleSize*2){
        for(let l=particleSize*2; l<3*width/8; l+=particleSize*2){
            particles.push(new Particle(l, m, particleSize));
        }
    }

    // create right side particles
    for(k=particleSize*16; k<particleSize*26; k+= particleSize*2){
        for(let r=5*width/8+particleSize; r<width-particleSize; r+=particleSize*2){
            particles.push(new Particle(r, k, particleSize));
        }
    }
    
    
    



}

function draw(){
    // setup background
    background(0, 50);

    // loop through particles
    for(let i=0; i<particles.length; i++){

        // // calculate distance between mouse and particle
        // let d = dist(mouseX, mouseY, particles[i].pos.x, particles[i].pos.y);
        // // when the mouse come close to a particle, repel
        // if(d<sensitivity){
        //     let repel = particles[i].calculateForce();
        //     repel.mult(particles[i].mass);
        //     particles[i].applyForce(repel);
        // }else{
        //     particles[i].stop(); // slow down and stop particles once they are far enough away from the mouse
        // }

        // update and draw particles
        particles[i].behaviors();
        particles[i].update();
        particles[i].display();
    }



}

//////////////////////////////////////////////////////////////////////////////////////////

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

    behaviors(){
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

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
// Eva Philips
// June 13, 2019
// This code serves as a proof of concept for a larger screen project.  This example serves to convey the visuals intended and to convey the types of interactions that are possible
// References (dan shifman, p5, posenet?)


// variables
let pluses = [];
let sensitivity = 80;
let plusImg;

function setup(){
    // setup canvas
    createCanvas(600, 600)
    background(0);

    // setup image
    plusImg = loadImage("plus.png");

    // create pluses
    for(let i=0; i<200; i++){
        let x = random(width);
        let y = random(height);
        pluses.push(new Plus(plusImg));
    }
    

}

function draw(){
    background(0);

    // loop through pluses array
    for(let i=0; i<pluses.length; i++){
        
        let d = dist(mouseX, mouseY, pluses[i].pos.x, pluses[i].pos.y);
        // when the mouse comes close a plus
        if(d<sensitivity){
            let repel = pluses[i].calculateForce();
            repel.mult(pluses[i].mass);
            pluses[i].applyForce(repel);
        }else{
            pluses[i].stop();  // slow down and stop plus once it is far enough away from the mouse
        }

        // update and show plus
        pluses[i].update();
        pluses[i].display();
        
    }
    

}


// Eva Philips
// July 30, 2019
// This code provides a skeleton sketch that retrieves the x, y position of your nose from a video input and provides an exmaple front ent possibility.
// Guidelines are provided for individuals to insert their own frontend based on nose position. 
// References:
// 1. This posenet code is largely based off of the code from: https://ml5js.org/reference/api-PoseNet/
// 2. This particle code is largely based off of the code from this video: https://editor.p5js.org/codingtrain/sketches/VDLbnxyQe

// variables for particle system
let particles = [];
let sensitivity = 80;
let particleSize;
let plusThickness = 3;

// variables for posenet
let video;
let poseNet;
let poses = [];


function setup(){
    // setup canvas
    let cvs = createCanvas(windowHeight, windowHeight);
    cvs.center('horizontal');;


    // set particle size based on scale
    particleSize = height/50;


    // setup video
    video = createCapture(VIDEO);
    video.size(windowHeight, windowHeight);
    video.hide();
    
    // setup posenet
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results){
        poses = results;
    })


    // create particles that make up the plus sign
    // vertical particles
    for(let i=particleSize; i<width/plusThickness; i+=particleSize*2){
        for(let j=particleSize; j<height; j+=particleSize*2){
            particles.push(new Particle(i + (width/2 - width/(plusThickness*2)), j, particleSize));
        }
    }
    // left side particles
    for(let l=particleSize*2; l<=width/2 - width/(plusThickness*2); l+=particleSize*2){
        for(let k=height/2 - width/(plusThickness*2) + (particleSize*1.5); k<height/2 + width/(plusThickness*2); k+=particleSize*2)
        particles.push(new Particle(l, k, particleSize));
    }
    // right side particles
    for(let l=width/2 + width/(plusThickness*2); l<width-particleSize; l+=particleSize*2){
        for(let k=height/2 - width/(plusThickness*2) + (particleSize*1.5); k<height/2 + width/(plusThickness*2); k+=particleSize*2)
        particles.push(new Particle(l, k, particleSize));
    }

}

function draw(){
    // set background
    background(0);

    // determine posenet nose position
    let nosePos;
    let point = nosePoint();
    if(point){
        nosePos = createVector(point[0], point[1]);
    }


    ////////////////Insert frontend here based on no nose position (x and y) /////////////////////
    
    // Sample Output...

    // draw a red point at the nose position
    // if(point){
    //     fill(255, 0, 0);
    //     ellipse(nosePos.x, nosePos.y, 10, 10);

    // }

    //draw a plus sign out of physics based particles
    //loop through particles array and draw/update them based on nose position
    if(point){
        for(let i=0; i<particles.length; i++){
            particles[i].behaviors(nosePos);
            particles[i].update();
            particles[i].display();
    
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
}


// callback functions for posenet
function modelReady(){
    console.log("model ready");
}

// draw posenet nose
function nosePoint(){
    for(let i=0; i<poses.length; i++){
        let keypoint = poses[i].pose.keypoints[0];
        if(keypoint.score>0.2){
            return [keypoint.position.x, keypoint.position.y]
        }
    }
}
// Eva Philips
// June 13, 2019
// This code serves as a proof of concept for a larger screen project.  This example serves to convey the visuals intended and to convey the types of interactions that are possible
// References: 
// 1. https://ml5js.org/reference/api-PoseNet/


// variables
let pluses = [];
let sensitivity = 80;
let plusImg;

let video;
let poseNet;
let poses = [];


function setup(){
    // setup canvas
    createCanvas(windowWidth, windowHeight);
    background(0);

    // setup video
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();

    // setup posenet
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results){
        poses = results;
    })

    // setup image
    plusImg = loadImage("plus.png");

    // create pluses
    for(let i=0; i<500; i++){
        let x = random(width);
        let y = random(height);
        pluses.push(new Plus(plusImg));
    }
    

}

function draw(){
    background(0);

    // draw nose from posenet
    let point = nosePoint();
    if(point){
        fill(255, 0, 0);
        ellipse(point[0], point[1], 5)
        //console.log(point);
    }
    

    // loop through pluses array
    if(point){
        for(let i=0; i<pluses.length; i++){
        
            //let d = dist(mouseX, mouseY, pluses[i].pos.x, pluses[i].pos.y);
            let d = dist(point[0], point[1], pluses[i].pos.x, pluses[i].pos.y);
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
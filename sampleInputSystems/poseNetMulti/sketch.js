// Eva Philips
// June 19, 2019
// This code documents the posenet keypoint and skeleton framework to highlight potential interactions. The number of people detected is printed to the screen.
// References:
// 1. This code is heavly based off of this reference code from the ml5.js website... https://ml5js.org/reference/api-PoseNet/



// variables for posenet setup
let video;
let poseNet;
let poses = [];

// boolean variables for drawing
let keypointIsDrawn = false;
let skeletonIsDrawn = false;
let img = false;

// DOM elements
let legendLabel;

function setup(){
    // setup canvas
    let cvs = createCanvas(600, 600);
    cvs.center('horizontal');

    // setup legend
    legendLabel = createP("Press the following keys to toggle on/off features: <br>key 'P' = show/hide keypoints <br> key 'S' = show/hide skeletons <br>key 'Space' = show/hide video input");
    legendLabel.position(0 , height + 50);
    legendLabel.center('horizontal');

    // setup video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // load posenet model
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results){
        poses = results;
    })


    
}

function draw(){
    // setup background
    background(0);
    // // flip video input to match use interaction
    // translate(width,0); // move to far corner of canvas
    // scale(-1.0,1.0); // flip the canvas horizontally

    // if space is toggled on, video input is shown
    if(img){
        drawImg();
    }
    
    // if keypoints toggle is on and poses are detected, draw points
    if(poses.length > 0 && keypointIsDrawn){
        drawKeypoints(poses);
    }

    // if skeleton toggle is on and poses are detected, draw skeleton
    if(poses.length > 0 && skeletonIsDrawn){
        drawSkeleton(poses);
    }

    // write number of people detected to screen
    fill(255);
    textSize(100);
    textAlign(CENTER);
    text("Is see ", poses.length, width/2, height/2);
}

////////////////////////////////////////////////////////////////////////////////////////////////

// toggle information with keyboard presses
function keyPressed(){
    // toggle keypoints on and off when key "p" is pressed
    if(keyCode === 80){       
        if(keypointIsDrawn){
            keypointIsDrawn = false;
        }else{
            keypointIsDrawn = true;
        }
    }
    // toggle skeleton on and off when key "s" is pressed
    if(keyCode === 83){       
        if(skeletonIsDrawn){
            skeletonIsDrawn = false;
        }else{
            skeletonIsDrawn = true;
        }
    }
    // toggle img on and off when key "space" is pressed
    if(keyCode === 32){       
        if(img){
            img = false;
        }else{
            img = true;
        }
    }
}

// callback function when poseNet has loaded
function modelReady(){
    console.log("model ready");
}

// find and draw keypoints
function drawKeypoints(){
    // loop through all the detected poses
    for(let i=0; i<poses.length; i++){
        let pose = poses[i].pose;
        // loop through each pose and detect the keypoints
        for(let j=0; j<pose.keypoints.length; j++){
            let keypoint = pose.keypoints[j];
            // draw keypoints from poses that have a probability larger than 0.2
            if(keypoint.score>0.2){
                fill(255);
                noStroke();
                ellipse(round(keypoint.position.x), round(keypoint.position.y), 10);
            }
        }   
    }   
}

// find and draw skeleton
function drawSkeleton(){
    // loop through all the detected poses
    for(let i=0; i<poses.length; i++){
        let skeleton = poses[i].skeleton;
        // loop through each link and detect skeleton
        for(let j=0; j<skeleton.length; j++){
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}

// display video input
function drawImg(){
    image(video, 0, 0, width, height);
}

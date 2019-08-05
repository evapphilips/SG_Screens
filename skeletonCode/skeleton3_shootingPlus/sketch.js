// Eva Philips
// August 1, 2019
// This code provides a skeleton...
// References:
// 1. This code is ...



// variables for plus image
let plusImg;
let offset = 50;

// variables for posenet
let video;
let poseNet;
let poses = [];


function setup(){
    // setup canvas
    let cvs = createCanvas(windowWidth, windowHeight);
    cvs.center('horizontal');
    background(0);

    // load plus image
    plusImg = loadImage("plus.png")

    // setup video
    video = createCapture(VIDEO);
    video.size(windowHeight, windowHeight);
    video.hide();

    // setup posenet
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function (results) {
        poses = results;
    })
}

function draw() {
    // set background
    background(0, 20);

     // determine posenet nose position
     let leftPos;
     let rightPos;
     let lpoint = leftPoint();
     let rpoint = leftPoint();
     if(lpoint){
         leftPos = createVector(lpoint[0], lpoint[1]);
     }
     if(rpoint){
        rightPos = createVector(rpoint[0], rpoint[1]);
    }


    ////////////////Insert frontend here based on nose position/////////////////////

    // Sample Output...
    // draw plus image based on nose position
    if(lpoint){
        imageMode(CENTER);
        image(plusImg, leftPos.x + offset, leftPos.y - offset, height / 15, height / 15);
    }
    if(rpoint){
        imageMode(CENTER);
        image(plusImg, rightPos.x + offset, rightPos.y - offset, height / 15, height / 15);
    }
    

    ////////////////////////////////////////////////////////////////////////////////////

}


// callback functions for posenet
function modelReady(){
    console.log("model ready");
}

// find posenet left wrist
function leftPoint(){
    for(let i=0; i<poses.length; i++){
        let keypoint = poses[i].pose.keypoints[9];
        if(keypoint.score>0.2){
            return [keypoint.position.x, keypoint.position.y]
        }
    }
}

// find posenet right wrist
function rightPoint(){
    for(let i=0; i<poses.length; i++){
        let keypoint = poses[i].pose.keypoints[9];
        if(keypoint.score>0.2){
            return [keypoint.position.x, keypoint.position.y]
        }
    }
}
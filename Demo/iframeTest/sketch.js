let url = 0;

// posenet setup
let video;
let poseNet;
let poses = [];

function setup(){
    // setup video
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();

    // setup posenet
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results){
        poses = results;
    })
}

function draw(){
    let nose = nosePoint();
    //console.log(nose);
        if(nose && nose[0]<50){
            if(url == 0){
                document.getElementById("myFrame").src = "skeleton2_particlePlus/index.html";
                url = 1;
            }else if(url == 1){
                document.getElementById("myFrame").src = "skeleton3_info/index.html";
                url = 2;
            }else if(url == 2){
                document.getElementById("myFrame").src = "skeleton1_brightnessMirror/index.html"
                url = 0;

            }  
        }

    
}

// function keyPressed(){
//     if(url == 0){
//         document.getElementById("myFrame").src = "indexSketch2.html";
//         url = 1;
//     }else if(url == 1){
//         document.getElementById("myFrame").src = "indexSketch1.html";
//         url = 0;
//     }    
// }

// callback functions for posenet
function modelReady(){
    console.log("model ready");
}

// find posenet nose
function nosePoint(){
    for(let i=0; i<poses.length; i++){
        let keypoint = poses[i].pose.keypoints[0];
        if(keypoint.score>0.2){
            return [keypoint.position.x, keypoint.position.y]
        }
    }
}
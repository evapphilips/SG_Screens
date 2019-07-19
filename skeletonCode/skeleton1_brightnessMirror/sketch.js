// Eva Philips
// July 15, 2019
// This code provides a skeleton sketch that retrieves the brightness value of a video input and provides an example front end frontend possibility. 
// Guidelines are provided for individuals to insert their on frontend based on brightness values. 
// References:
// 1. This code is largely based off of the code from video: https://www.youtube.com/watch?v=rNqaw8LT2ZU



// variables for video setup
let video;
let vScale = 16;

// variables for pluses
let pluses = [];

function setup(){
    // setup canvas
    let cvs = createCanvas(800, 800);
    cvs.center('horizontal');

    // video setup
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width/vScale, height/vScale);
    video.hide();


    
}

function draw(){
    // set background
    background(0);

    // manipulate video 
    video.loadPixels();
    loadPixels();
    for(let i=0; i<video.height; i++){
        for(j=0; j<video.width; j++){
            // retrieve pixel values from video input
            let index = (i + j * video.width)*4;
            let r = video.pixels[index+0];
            let g = video.pixels[index+1];
            let b = video.pixels[index+2];

            // calculate brightness
            let bright = (r+g+b)/3;


            ////////////////Insert frontend here based on brightness value/////////////////////

            // Sample Output...(note: each tile is maximum vScale by vScale)

            // draw rectangle with size based on brightness value
            // fill(255);
            // let w = map(bright, 0, 255, 0, vScale);
            // rect(i*vScale, j*vScale, w, w);

            
            // draw a plus with stroke weight based on brightness value
            rectMode(CENTER);
            fill(255);
            noStroke();
            let th =  map(bright, 0, 255, 1, vScale);
            rect(i*vScale, j*vScale, th, vScale-1);
            rect(i*vScale, j*vScale, vScale-1, th);

            ////////////////////////////////////////////////////////////////////////////////////

        }
    }
    
}



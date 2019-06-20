// Eva Philips
// June 19, 2019
// This code documents the possibility to determine edge detection for a silhouette. 
// References:
// 1. This code is heavily based on this sample code - https://editor.p5js.org/kylemcdonald/sketches/HJXWJv9nX
// 2. The documentation for jsfeat can be found here - ehttps://inspirit.github.io/jsfeat/


// variables for edge detection setup
let video;
let buffer;
let result;
let blur = 12; // generally between 1 and 12
let lowThresh = 0; // between 0 and 255
let highThresh = 150; // between 0 and 255

//  variables for sliders
let blurLabel;
let blurSlider;
let lowThreshLabel;
let lowThreshSlider;
let highThreshLabel;
let highThreshSlider;
let spc = 60;


function setup(){
    // canvas setup
    let cvs = createCanvas(600, 600);
    cvs.center();

    // setup video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // setup buffer
    buffer = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t);

    // setup sliders and labels
    blurSlider = createSlider(1, 12, 12);
    blurSlider.position(0, (1.25*height)+spc);
    blurSlider.center('horizontal');
    blurLabel = createP("Blur");
    blurLabel.position(0, (1.25*height));
    blurLabel.center('horizontal');

    lowThreshSlider = createSlider(0, 255, 0);
    lowThreshSlider.position(0, (1.25*height)+(2*spc));
    lowThreshSlider.center('horizontal');
    lowThreshLabel = createP("Threshold - Low");
    lowThreshLabel.position(0, (1.25*height)+(spc));
    lowThreshLabel.center('horizontal');

    highThreshSlider = createSlider(0, 255, 200);
    highThreshSlider.position(0, (1.25*height)+(3*spc));
    highThreshSlider.center('horizontal');
    highThreshLabel = createP("Threshold - High");
    highThreshLabel.position(0, (1.25*height)+(2*spc));
    highThreshLabel.center('horizontal');

}

function draw(){
    // find edges of video capture
    video.loadPixels(); // load the pictures in the current frame
    if(video.pixels.length>0 ){

        // get inputs from sliders
        blur = blurSlider.value();
        lowThresh= lowThreshSlider.value();
        highThresh = highThreshSlider.value();

        // manipulate input video
        jsfeat.imgproc.grayscale(video.pixels, width, height, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blur, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThresh, highThresh);

        // translate to p5.js and draw to canvas
        result = jsfeatToP5(buffer, result);
        image(result, 0, 0, width, height);

    }

}

//////////////////////////////////////////////////////////////////////////////////////////


// convert javaScript feature to p5.js feature (function taken from source (1) above)
function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}
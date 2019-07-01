// Eva Philips
// June 28, 2019
// This code documents one potental output system for a S+G interactive screen
// References:



// variables
let plusImg;
let offset = 50;

function setup(){
    // setup background
    let cvs = createCanvas(800, 800);
    cvs.center('horizontal');
    background(0);

    // load plus image
    plusImg = loadImage("plus.png")

}

function draw(){
    // setup background
    background(0, 50);

    // draw plus image
    imageMode(CENTER);
    image(plusImg, mouseX + offset, mouseY - offset, 50, 50);

}

//////////////////////////////////////////////////////////////////////////////////////////


// Eva Philips
// July 1, 2019
// This code documents one potental output system for a S+G interactive screen
// References:



// variables
let scl = 20;
let imageArray = [];
let plusArray = [];


function setup(){
    // setup background
    let cvs = createCanvas(800, 800);
    cvs.center('horizontal');

    // //setup "image" array (aka grid of greyscale tiles)
    // for(let i=width/(2*scl); i<width; i+=width/scl){
    //     for(let j=height/(2*scl); j<height; j+=height/scl){
    //         imageArray.push(new Tile(i, j, scl));
    //     }
    // }

    for(let i=0; i<scl + 1; i++){
        for(let j=0; j<scl + 1; j++){
            if(j%2 == 0){
                imageArray.push(new Tile((i* width/scl) + width/(2*scl), j * height/(scl), scl));
            }else if(j%2 == 1){
                imageArray.push(new Tile(i * width/scl, j * height/(scl), scl))
            }
        }
    }

    // create an array of pluses with weights mapped to the "image" array
    for(let l=0; l<imageArray.length; l++){
        let tile = imageArray[l];
        plusArray.push(new Plus(tile.x, tile.y, tile.col, width/scl - scl/2))
    }
   


}

function draw(){
    // setup background
    background(255);



    for(let k=0; k<imageArray.length; k++){
        let col = imageArray[k].update();
        plusArray[k].update(col);
    }

    // display pluses
    for(let i=0; i<plusArray.length; i++){
        plusArray[i].show();
    }
    



}

//////////////////////////////////////////////////////////////////////////////////////////

class Plus{
    constructor(x, y, col, tileSize){
        this.x = x;
        this.y = y;
        this.th = map(col, 0, 255, 0, tileSize);
        this.tileSize = tileSize;
    }

    show(){
        rectMode(CENTER);
        fill(0);
        noStroke();
        rect(this.x, this.y, this.th, this.tileSize);
        rect(this.x, this.y, this.tileSize, this.th);
    }

    update(col){
        this.th = map(col, 0, 255, 0, this.tileSize);
    }
}

class Tile{
    constructor(x, y, scl){
        this.x = x;
        this.y = y;
        this.col = random(0, 255);
        this.tileSize = width/scl;
        
        this.xoff = random(0, .25);
        this.dir = Math.round(Math.random())*2-1;

    }

    show(){
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.tileSize, this.tileSize);
    }

    update(){
        this.xoff = this.xoff + (this.dir * 0.01);
        this.col = noise(this.xoff) *255
        return this.col
    }

}


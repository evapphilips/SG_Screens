// Eva Philips
// August 1, 2019
// This code....
// References:


toggle = true;
let view;


// setup first canvas

function cvs1(m) {

    m.setup = function () {
        m.createCanvas(200, 200);
        m.background(220);

        m.x = m.width / 2;
        m.y = m.height / 2;
    }

    m.draw = function () {
        m.fill(255, 0, 0);
        m.noStroke();
        m.ellipse(m.x, m.y, 20, 20);
    }

    m.mousePressed = function(){
        toggle = !toggle;
        console.log(toggle);
    }
}

// setup second canvas

function cvs2(p) {

    p.setup = function () {
        p.createCanvas(200, 200);
        p.background(100);

        p.x = p.width / 2;
        p.y = p.height / 2;
    }

    p.draw = function () {
        p.fill(0, 255, 0);
        p.noStroke();
        p.ellipse(p.x, p.y, 50, 50);
    }

    p.mousePressed = function(){
        toggle = !toggle;
        console.log(toggle);
    }
}

if(view){
    view.background(0);
}
//let view = new p5(cvs1);
if (toggle) {
    view = new p5(cvs1);
} else if (!toggle) {
    view = new p5(cvs2);
}


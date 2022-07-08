let DIR;
const SPEED = 3; // 3

const MARGIN_X = -30;
const MARGIN_Y = 20;

let trail;
let dots;
let score;

function setup() {
  createCanvas(600, 300); // 600, 300

  trail = new Trail();
  dots = new Dots();
  score = new Score();
}

function draw() {
  if (keyIsDown(32)) {
    // SPACE
    DIR = -1;
  } else {
    DIR = 1;
  }

  // --- COMPUTE
  trail.update();
  dots.update();

  if (score.SCORE < 0) {
    // GAME OVER
    noLoop();
    return;
  }

  // --- DRAW
  background(255);

  score.render();
  trail.render();
  dots.render();
}

function keyPressed() {
  if (key == 's') {
    //
  }
}

//void speedup() {
//  int time = 3000; // ms

//}

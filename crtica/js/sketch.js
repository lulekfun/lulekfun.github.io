const SPEED = 3; // 3

let IS_PLAYING = false;

const MARGIN_X = -30;
const MARGIN_Y = 20;

let trail;
let dots;
let score;

function setup() {
  createCanvas(600, 300); // 600, 300
  frameRate(60);
  noCursor();

  trail = new Trail();
  dots = new Dots();
  score = new Score();

  for (let i = 0; i < 90; i++) {
    trail.update(); // render a portion of the trail
  }
}

function draw() {
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

  if (IS_PLAYING) score.render();
  else renderWelcome();

  trail.render();
  dots.render();
}

function keyPressed() {
  if (keyIsDown(32)) IS_PLAYING = true;
}

function renderWelcome() {
  fill(0);
  noStroke();
  textFont('Menlo, Consolas, monospace');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('PRITISNI SPACE', (width + trail.head.x) / 2, height / 2);
}

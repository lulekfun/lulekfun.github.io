const SPEED = 3; // 3

const MARGIN_X = -30;
const MARGIN_Y = 20;

let GAME_STATE = 'WELCOME';

let trail;
let dots;
let score;
let lives;

function setup() {
  createCanvas(600, 300); // 600, 300
  frameRate(60);
  noCursor();

  lives = new Lives();
  trail = new Trail();
  dots = new Dots();
  score = new Score();
}

function draw() {
  // --- COMPUTE

  trail.update();
  dots.update();

  // --- DRAW
  background(255);

  // render: DOTS < TRAIL < LIVES < SCORE

  if (GAME_STATE === 'PLAYING') {
    dots.render();
    trail.render();
    lives.render();
    score.render();
  } else if (GAME_STATE === 'WELCOME') {
    trail.render();
    renderWelcome();
  } else if (GAME_STATE === 'GAME_OVER') {
    dots.render();
    trail.render();
    renderGameOver();
    noLoop();
  }
}

function mainPressed() {
  return keyIsDown(32); //  || mouseIsPressed
}

function keyPressed() {
  if (mainPressed()) {
    if (GAME_STATE === 'GAME_OVER') {
      GAME_STATE = 'WELCOME';
      score.init();
      lives.init();
      dots.init();
      trail.init();
      loop();
    } else if (GAME_STATE === 'WELCOME') {
      GAME_STATE = 'PLAYING';
    }
  }
}

function renderWelcome() {
  fill(0);
  noStroke();
  textFont('Menlo, Consolas, monospace');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textLeading(27);
  text(`PRITISNI SPACE\n[${score.getHigh()}]`, (width + trail.head.x) / 2, height / 2);
}

function renderGameOver() {
  noStroke();
  fill(255, 255, 255, 200);
  rect(0, 0, width, height);
  fill(0);
  noStroke();
  textFont('Menlo, Consolas, monospace');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`KONEC IGRE\n[${score.SCORE}]`, width / 2, height / 2); // center
}

const SPEED = 3; // 3

const MARGIN_X = -30;
const MARGIN_Y = 20;

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

  if (gameState.is('PLAYING')) {
    dots.render();
    trail.render();
    lives.render();
    score.render();
  } else if (gameState.is('WELCOME')) {
    trail.render();
    renderWelcome();
  } else if (gameState.is('GAME_OVER')) {
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
    if (gameState.is('GAME_OVER')) {
      gameState.set('WELCOME');
      score.init();
      lives.init();
      dots.init();
      trail.init();
      loop();
    } else if (gameState.is('WELCOME')) {
      gameState.set('PLAYING');
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

const gameState = {
  STATE: 'WELCOME',
  states: ['WELCOME', 'PLAYING', 'GAME_OVER'],
  is(string) {
    this.checkSpelling(string);
    return this.STATE === string;
  },
  includes(...strings) {
    // strings == array
    strings.forEach((s) => this.checkSpelling(s));
    return strings.includes(this.STATE);
  },
  set(string) {
    this.checkSpelling(string);
    this.STATE = string;
  },
  checkSpelling(string) {
    if (!this.states.includes(string)) throw new Error('state does not exist');
  },
};

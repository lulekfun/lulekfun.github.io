let player;
let bullets;
let enemies;
let progress;
let powerups;

// let SPEED = 3; // TODO: const?
let LEVEL = 0;
let DIR = 0; // left-right

const PADDING_X = 10;
const PADDING_Y = -10; // -10px

let SHOT_NO = 1;
let SHOTS = 0;

let BG_COLOR;

function setup() {
  createCanvas(300, 400);
  frameRate(60);

  player = new Player();
  bullets = new Bullets();
  enemies = new Enemies();
  progress = new Progress();
  powerups = new Powerups();

  BG_COLOR = color(0);

  noSmooth();
  noCursor();
}

function draw() {
  // -- LOGIC
  checkKeys(); // for direction

  player.update();
  bullets.update();
  enemies.update();
  progress.update();

  // -- GRAPHICS
  background(BG_COLOR);

  player.render();
  bullets.render();
  enemies.render();

  progress.render();
}

function keyPressed() {
  if (key == ' ') {
    // fire shots
    SHOTS = SHOT_NO;

    progress.add(-2);
  }

  if (key == 'e') {
    enemies.new(); // TODO: delete?
  }
}

function checkKeys() {
  DIR = -keyIsDown(LEFT_ARROW) + keyIsDown(RIGHT_ARROW);
}

function gameOver() {
  // --- red glow
  // fill(255, 0, 0, 50);
  // blendMode(SCREEN);
  // rect(0, 0, width, height);

  noLoop();
}

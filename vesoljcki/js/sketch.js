let player;
let bullets;
let enemies;

const SPEED = 3;
let DIR = 0; // left-right

const PADDING_X = 10;
const PADDING_Y = -10; // -10px

let SHOTS = 0;

// function preload() {
//   img = loadImage('assets/bricks.jpg');
// }

function setup() {
  createCanvas(300, 400);
  frameRate(120);

  player = new Player();
  bullets = new Bullets();
  enemies = new Enemies();

  noSmooth();
  // noCursor();
}

function draw() {
  // -- LOGIC
  checkKeys(); // for direction

  player.update();
  bullets.update();
  enemies.update();

  if (SHOTS) {
    let locX = player.locX;
    let locY = height - player.h;
    bullets.new(locX, locY);

    --SHOTS;
  }

  // -- GRAPHICS
  background(0);

  player.render();
  bullets.render();
  enemies.render();
}

function keyPressed() {
  if (key == ' ') {
    SHOTS = 1;
  }

  if (key == 'e') {
    enemies.new();
  }
}

function checkKeys() {
  DIR = -keyIsDown(LEFT_ARROW) + keyIsDown(RIGHT_ARROW);
}

function gameOver() {
  // red glow
  // fill(255, 0, 0, 50);
  // blendMode(SCREEN);
  // rect(0, 0, width, height);

  noLoop();
}

let COEFF = 1;
let CAMERA_HEIGHT = 0;
const MARGIN_X = 30; // (px) HALF OF FLOOR WIDTH = 25

let LEVEL = 1; // starts with 1
let FLOORS_NO = 0;
const MAX_LEVEL = 10;
const FLOOR_HEIGHT = 40; // px

let skrat;
let ground;
let progress;

const COLORS = {
  GOLD: [255, 210, 110],
  // GOLD: [255, 210, 50],
  SAHARA: [255, 200, 25],
  ROSE_GOLD: [255, 180, 150],
  RED: [255, 150, 150],
  MAGENTA: [225, 200, 255],
  VIOLET: [190, 190, 255],
  PINK: [255, 200, 200],
  SKY_BLUE: [180, 225, 255],
  DEEP_BLUE: [150, 190, 255],
  MOLD: [180, 230, 210],
};

let lexend;

function preload() {
  lexend = loadFont('fonts/Lexend-Thin.ttf');
}

function setup() {
  createCanvas(200, 400);

  noSmooth();
  noCursor();

  textFont(lexend);
  textSize(100);
  textAlign(CENTER, CENTER);

  // -- init
  progress = new Progress();
  init();
}

function draw() {
  COEFF = minmax(60 / frameRate(), 1, 2);

  // -- update
  skrat.update();
  floors.update();
  powerups.update();
  progress.update();

  if (skrat.falling) {
    const camera_speed = skrat.pos.y === 0 ? 0.01 : 0.15;
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.pos.y - height / 3), camera_speed * COEFF); // falling down
  } else {
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.floor - height / 3), 0.05 * COEFF); // keeping up
  }

  // -- render
  background(255);

  drawText();

  powerups.render();
  floors.render();
  skrat.render();
  progress.render();
}

function drawText() {
  const pos = height * 0.6 + CAMERA_HEIGHT / 2;
  noStroke(0);
  fill(240);
  text(LEVEL, width / 2, pos);
}

function init() {
  const TIME_INTERVAL = 1000 * 60 * 60; // 1 HOUR
  randomSeed(LEVEL + new Date() / TIME_INTERVAL); // LEVEL + ..

  FLOORS_NO = floorsNo(LEVEL);

  GRAVITY = 0.3;
  FRICTION = 0.15;
  FLOOR_WIDTH = 40;

  skrat = new Skratek();
  floors.init();
  powerups.init(); // after floors!
}

function heal() {
  GRAVITY = 0.3;
  FRICTION = 0.15;
  DIR = 1;
  FLOOR_WIDTH = 40;
}

function keyPressed() {
  if (keyCode === ENTER && powerups.goal.is_collected) {
    LEVEL++;
    init();
  }
}

// --- UTILS

function floorsNo(x) {
  return floor(2 ** ((x + 6) / 2)) - 6;
}

function minmax(val, min_val, max_val) {
  return min(max_val, max(min_val, val));
}

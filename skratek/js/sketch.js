let COEFF = 1;
let CAMERA_HEIGHT = 0;
const MARGIN_X = 30; // (px) HALF OF FLOOR WIDTH = 25

let LEVEL = 0;
let FLOORS_NO = 4;
let FLOOR_HEIGHT = 40; // px

let skrat;
let ground;
let progress;

const COLORS = {
  GOLD: [255, 210, 50],
  SAHARA: [255, 200, 25],
  ROSE_GOLD: [255, 180, 150],
  RED: [255, 150, 150],
  MAGENTA: [225, 200, 255],
  SKY_BLUE: [180, 225, 255],
  MOLD: [180, 230, 210],
};

function setup() {
  createCanvas(200, 400);

  noSmooth();
  noCursor();

  const TIME_INTERVAL = 1000 * 60 * 60; // 1 HOUR
  randomSeed(new Date() / TIME_INTERVAL);

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

  if (skrat.pos.y < skrat.level) {
    const camera_speed = skrat.pos.y === 0 ? 0.01 : 0.15;
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.pos.y - height / 3), camera_speed); // falling down
  } else {
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.level - height / 3), 0.05); // keeping up
  }

  // -- render
  background(255);
  powerups.render();
  floors.render();
  skrat.render();
  progress.render();

  // -- testing
  // stroke(255, 0, 0, 100);
  // line(0, CAMERA_HEIGHT + height - skrat.floor, width, CAMERA_HEIGHT + height - skrat.floor);
}

function init() {
  ++LEVEL;
  FLOORS_NO = floor(5 * LEVEL ** 1.2);

  skrat = new Agent();
  powerups.init(); // before floors!
  floors.init();
}

// --- UTILS

function minmax(val, min_val, max_val) {
  return min(max_val, max(min_val, val));
}

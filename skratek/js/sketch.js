let COEFF = 1;
let CAMERA_HEIGHT = 0;
const MARGIN_X = 30; // (px) HALF OF FLOOR WIDTH = 25

let LEVEL = 0; // starts with 0
let FLOORS_NO = 0;
const FLOOR_HEIGHT = 40; // px

let skrat;
let ground;
let progress;

const COLORS = {
  GOLD: [255, 210, 50],
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

  if (skrat.pos.y < skrat.floor) {
    const camera_speed = skrat.pos.y === 0 ? 0.01 : 0.15;
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.pos.y - height / 3), camera_speed); // falling down
  } else {
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.floor - height / 3), 0.05); // keeping up
  }

  // -- render
  background(255);
  powerups.render();
  floors.render();
  skrat.render();
  progress.render();
}

function init() {
  ++LEVEL; // TODO: raje pri powerup? malo je vseeno hecno
  FLOORS_NO = floor(2 ** ((LEVEL + 6) / 2)) - 6;

  GRAVITY = 0.3;
  FRICTION = 0.15;
  FLOOR_WIDTH = 40;

  skrat = new Agent();
  floors.init();
  powerups.init(); // after floors!
}

function heal() {
  GRAVITY = 0.3;
  FRICTION = 0.15;
  REVERSE = 1;
  FLOOR_WIDTH = 40;

  // powerups.init(); // NOTE: vprasaj larico, kaj ji je boljse
}

// --- UTILS

function minmax(val, min_val, max_val) {
  return min(max_val, max(min_val, val));
}

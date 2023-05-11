let GRAVITY = 0.3;
const FRICTION = 0.2; // 0 -> 1; 0.2

let COEFF = 1;
const MARGIN_X = 30; // (px) HALF OF FLOOR WIDTH = 25
let CAMERA_HEIGHT = 0;

let FLOORS_NO = 4;
let FLOOR_HEIGHT = 40; // px

let skrat;
let ground;
let progress;
let floors = [];
let powerups = [];

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

  init();

  noSmooth();
  noCursor();
}

function draw() {
  COEFF = minmax(60 / frameRate(), 1, 2);

  // update
  skrat.update();
  progress.set(skrat.level / FLOOR_HEIGHT);
  if (skrat.pos.y < skrat.level) {
    const camera_speed = skrat.pos.y === 0 ? 0.01 : 0.15;
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.pos.y - height / 3), camera_speed); // falling down
  } else {
    CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.level - height / 3), 0.05); // keeping up
  }

  // render
  background(255);
  powerups.forEach((p) => p.render());
  floors.forEach((f) => f.render());
  skrat.render();
  progress.render();
}

function init() {
  // reset values
  floors = [];
  powerups = [];
  skrat = new Agent();
  progress = new Progress(FLOORS_NO);
  ground = new Floor(width / 2, 0, width);

  // prepare everything
  for (let i = 1; i <= FLOORS_NO; i++) {
    const y = i * FLOOR_HEIGHT;
    const x = random(MARGIN_X, width - MARGIN_X);

    floors.push(new Floor(x, y));

    if (i !== FLOORS_NO && i % 8 === 0) {
      powerups.push(new Powerup(x, y));
    }
  }

  floors.at(0).x = width - width / 5;
  floors.at(-1).x = width / 2; // last one is centered
  powerups.push(new Goal(width / 2, floors.at(-1).y));
}

function keyPressed() {
  if (key === 'Enter') init();
}

// --- UTILS

function minmax(val, min_val, max_val) {
  return min(max_val, max(min_val, val));
}

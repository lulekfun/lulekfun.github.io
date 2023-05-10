let GRAVITY = 0.3;
const FRICTION = 0.2; // 0 -> 1; 0.2

let COEFF = 1;
const MARGIN_X = 30; // (px) HALF OF FLOOR WIDTH = 25
let CAMERA_HEIGHT = 0;

let FLOORS_NO = 5;
let FLOOR_HEIGHT = 40; // px

let skrat;
let ground;
let floors = [];
let powerups = [];

let prev_millis = 0;
let delta_millis = 0;

const COLORS = {
  GOLD: [250, 210, 0],
  RED: [255, 120, 120],
  MAGENTA: [225, 200, 255],
  CYAN: [180, 225, 255],
  SAHARA: '#FFC418',
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
  CAMERA_HEIGHT = lerp(CAMERA_HEIGHT, max(0, skrat.level - height / 3), 0.05);
  // ground.y = CAMERA_HEIGHT = max(0, skrat.max_y - height / 3);

  // render
  background(255);
  powerups.forEach((p) => p.render());
  floors.forEach((f) => f.render());
  skrat.render();

  delta_millis = millis() - prev_millis;
  prev_millis = millis();
}

function init() {
  // reset values
  floors = [];
  powerups = [];
  skrat = new Agent();
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

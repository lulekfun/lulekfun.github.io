let DIR = { x: 0, y: -1 };

let snake;
let apple;

const MARGIN_X = 10; // px
const MARGIN_Y = 10;

function setup() {
  createCanvas(300, 300);
  frameRate(60); // 60

  snake = new Snake();
  apple = new Apple();

  noCursor();
  noLoop();
}

let GAME_OVER = false;
let WELCOME = true;
let IS_PLAYING = false;

function draw() {
  // --- UPDATE
  snake.update(); // updates location

  // --- RENDER
  background(50);
  snake.render();
  apple.render();

  // --- TESTING
  if (frameCount % 100 == 0) {
    let fr = frameRate();
    if (fr < 55) console.warn(frameRate());

    console.log(deflated(snake.coords));
  }
}

function keyPressed() {
  if (key == 'g') {
    snake.food += 10;
  } else if (key == ' ') {
    loop();
  }

  if (keyCode === LEFT_ARROW) {
    DIR.x = -1;
    DIR.y = 0;
  } else if (keyCode === RIGHT_ARROW) {
    DIR.x = 1;
    DIR.y = 0;
  } else if (keyCode === UP_ARROW) {
    DIR.x = 0;
    DIR.y = -1;
  } else if (keyCode === DOWN_ARROW) {
    DIR.x = 0;
    DIR.y = 1;
  }
}

function gameOver() {
  background('#EA5858');
  snake.render();
  noLoop();
}

let COORDS = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 3, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 1 },
];

function deflated(arr) {
  return arr.filter((_, i) => {
    let prev = arr[i - 1];
    let next = arr[i + 1];

    if (!prev || !next) return true;
    return prev.dist(next) !== snake.speed * 2; // is corner
  });
}

// console.log(deflated(COORDS));

function deflate(arr) {
  let deflatedArr = [];

  deflatedArr.push(arr[0]);

  for (let i = 1; i < arr.length - 1; ++i) {
    let sameX = arr[i - 1].x == arr[i + 1].x;
    let sameY = arr[i - 1].y == arr[i + 1].y;

    if (!sameX && !sameY) {
      // is corner
      deflatedArr.push(arr[i]);
    }
  }

  deflatedArr.push(arr[arr.length - 1]);

  return deflatedArr;
}

// --- UTILS

function negMod(n, mod) {
  while (n < 0) n += mod;
  return n % mod;
}

let snake;
let apple;
let score;

const MARGIN_X = 10; // px
const MARGIN_Y = 10;

let GAME_STATE = 'WELCOME';

function drawWelcome() {
  fill(150);
  noStroke();
  textFont('Menlo, Consolas, monospace');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('PRITISNI SPACE!', width / 2, height / 2);
}

function setup() {
  createCanvas(300, 300);
  frameRate(60); // 60

  snake = new Snake();
  apple = new Apple();
  score = new Score();

  noCursor();
  noLoop();
}

function draw() {
  // --- UPDATE
  snake.update(); // updates location

  // --- RENDER
  if (GAME_STATE === 'WELCOME') {
    background(50);
    drawWelcome();
    snake.render();
  } else if (GAME_STATE === 'PLAYING') {
    background(50);
    score.render();
    snake.render();
    apple.render();
  } else if (GAME_STATE === 'GAME_OVER') {
    background('#EA5858');
    score.render();
    snake.render();
    apple.render();
    noLoop();
  }
}

function keyPressed() {
  if (key == 'g') {
    snake.food += 10;
  } else if (key == ' ') {
    if (GAME_STATE === 'WELCOME') {
      GAME_STATE = 'PLAYING';
      loop();
    } else if (GAME_STATE === 'GAME_OVER') {
      GAME_STATE = 'WELCOME';
      snake.init();
      redraw();
    }
  }

  if (keyCode === LEFT_ARROW) {
    snake.dir.x = -1;
    snake.dir.y = 0;
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir.x = 1;
    snake.dir.y = 0;
  } else if (keyCode === UP_ARROW) {
    snake.dir.x = 0;
    snake.dir.y = -1;
  } else if (keyCode === DOWN_ARROW) {
    snake.dir.x = 0;
    snake.dir.y = 1;
  }
}

function deflated(arr) {
  return arr.filter((_, i) => {
    let prev = arr[i - 1];
    let next = arr[i + 1];

    if (!prev || !next) return true;
    return prev.dist(next) !== snake.speed * 2; // is corner
  });
}

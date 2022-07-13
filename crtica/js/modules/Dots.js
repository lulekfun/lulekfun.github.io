class Dot {
  constructor() {
    this.defaultRadius = 8;

    this.radius = null;
    this.fillColor = null;

    let coordX = width - MARGIN_X;
    let coordY = random(MARGIN_Y, height - MARGIN_Y);

    this.coords = createVector(coordX, coordY);

    this.isEaten = false;
    this.onEaten = null;

    this.init();
  }

  init() {
    let rand = random(100);

    let GOLD = color(250, 225, 0);
    let RED = color(255, 120, 120);
    let MAGENTA = color(225, 150, 255);
    let CYAN = color('#ADF5E6');

    if (rand < 1) {
      // LIFE
      this.onEaten = function () {
        lives.init();
      };
      this.radius = this.defaultRadius;
      this.fillColor = RED;
    } else if (rand < 2) {
      // MEGANUGGET
      this.onEaten = () => score.add(100); // give 100 points
      this.radius = this.defaultRadius * 1.8;
      this.fillColor = CYAN;
    } else if (rand < 10) {
      // GOLDEN NUGGET
      this.onEaten = () => score.add(20); // give 20 points
      this.radius = this.defaultRadius * 1.5;
      this.fillColor = GOLD;
    } else {
      // DEATH
      this.onEaten = function () {
        lives.decrease();
      };
      this.radius = this.defaultRadius;
      this.fillColor = color(255); // WHITE
    }
  }

  moveLeft() {
    this.coords.x -= SPEED;
  }

  render() {
    strokeWeight(3);

    if (this.isEaten) {
      noFill();
      stroke(100);
    } else {
      fill(this.fillColor);
      stroke(0);
    }

    circle(this.coords.x, this.coords.y, this.radius);
  }

  eat() {
    this.isEaten = true;
    this.onEaten(); // defined on init
  }

  checkEating() {
    if (!this.isEaten && dist(trail.head.x, trail.head.y, this.coords.x, this.coords.y) < this.radius) {
      this.eat();
    }
  }

  isObsolete() {
    return this.coords.x < MARGIN_X;
  }
}

class Dots {
  constructor() {
    this.dots = [];
  }

  init() {
    this.dots = [];
  }

  update() {
    // check for eating, move left
    for (let d of this.dots) {
      d.checkEating();
      d.moveLeft();
    }

    // add new dots
    if (GAME_STATE === 'PLAYING' && frameCount % 20 === 0) {
      let d = new Dot();
      this.dots.push(d);
    }

    this.dots = this.dots.filter((d) => !d.isDead); // remove obsolete
  }

  render() {
    for (let d of this.dots) {
      d.render();
    }
  }
}

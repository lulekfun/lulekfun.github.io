class Dot {
  constructor() {
    this.defaultRadius = 8;

    this.power = this.randomPower();
    this.radius;
    this.fillColor;

    let coordX = width - MARGIN_X;
    let coordY = random(MARGIN_Y, height - MARGIN_Y);

    this.coords = createVector(coordX, coordY);

    this.isEaten = false;
  }

  randomPower() {
    let rand = random(100);

    let GOLD = color(250, 225, 0);
    let RED = color(255, 150, 150);
    let MAGENTA = color(225, 150, 255);
    let CYAN = color('#ADF5E6');

    if (rand < 0.5) {
      this.power = 100;
      this.radius = this.defaultRadius * 1.8;
      this.fillColor = CYAN;
    } else if (rand < 10) {
      this.power = 20;
      this.radius = this.defaultRadius * 1.5;
      this.fillColor = GOLD;
    } else {
      this.power = -100;
      this.radius = this.defaultRadius;
      this.fillColor = color(255); // WHITE
    }

    return round(this.power);
  }

  moveLeft() {
    this.coords.x -= SPEED;
  }

  render() {
    strokeWeight(3);

    if (this.isEaten) {
      noFill();
      stroke(0, 0, 0, 100);
    } else {
      fill(this.fillColor);
      stroke(0);
    }
    circle(this.coords.x, this.coords.y, this.radius);
  }

  eat() {
    if (!this.isEaten) {
      score.add(this.power);
      this.isEaten = true;
    }
  }

  isDead() {
    return this.coords.x < MARGIN_X;
  }
}

class Dots {
  constructor() {
    this.dots = [];
  }

  update() {
    this.checkForEating();

    // add new dots
    if (IS_PLAYING && frameCount % 20 == 0) {
      let d = new Dot();
      this.dots.push(d);
    }

    // move left
    for (let i = 0; i < this.dots.length; i++) {
      let d = this.dots[i];
      d.moveLeft();
    }

    this.dots = this.dots.filter((d) => !d.isDead()); // delete if not in use
  }

  render() {
    for (let d of this.dots) {
      d.render();
    }
  }

  checkForEating() {
    for (let d of this.dots) {
      if (trail.head.dist(d.coords) < d.radius) {
        d.eat();
      }
    }
  }
}

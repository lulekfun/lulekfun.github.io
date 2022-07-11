class Snake {
  constructor() {
    this.initialLength = 8;
    this.coords = [];

    this.speed = 1.5;

    let head = createVector(width / 2, height * 0.7);

    // create snake
    for (let i = 0; i < this.initialLength; i++) {
      this.coords[i] = createVector(head.x, head.y + i * this.speed);
    }

    // this.isDead = false;

    this.food = 0;
  }

  get head() {
    return this.coords[0];
  }

  get length() {
    return this.coords.length;
  }

  get isEating() {
    return this.head.dist(apple.coords) <= apple.width;
  }

  isDead(newHead) {
    let isCrossed = this.coords.some((c) => c.equals(newHead));
    let isOverBorder = newHead.x < 0 || newHead.y < 0 || newHead.x > width || newHead.y > height;

    return isCrossed || isOverBorder;
  }

  update() {
    // add newly calculated front point
    let newX = this.head.x + DIR.x * this.speed;
    let newY = this.head.y + DIR.y * this.speed;

    let newHead = createVector(newX, newY);

    if (this.isDead(newHead)) {
      // she is dead
      return;
    }

    this.coords.unshift(newHead);

    // remove last point
    if (this.food && frameCount % 2 == 0) {
      --this.food;
    } else {
      this.coords.splice(-1, 1);
    }

    // is eating food
    if (this.isEating) {
      this.food += ceil(this.length * 0.2);
      apple.new();
    }
  }

  render() {
    noFill();
    stroke(255);
    strokeWeight(2);

    let arr = deflated(this.coords);

    // draw each segment separately

    beginShape();
    for (let c of arr) {
      vertex(c.x, c.y);
    }
    endShape();
  }
}

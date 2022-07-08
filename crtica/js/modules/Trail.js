class Trail {
  constructor() {
    this.diff = 0;

    this.head = createVector(200, 0); //  200, 0
    this.coords = [];
  }

  update() {
    this.computeY();
    this.computeVertices();
    this.moveLeft();

    if (this.isOffScreen()) {
      --score.SCORE;
    }
  }

  computeY() {
    this.diff += 0.2 * DIR;
    this.head.y += this.diff;
  }

  computeVertices() {
    this.coords.push(createVector(this.head.x, this.head.y));

    // remove hidden vertices
    for (let c = 0; this.coords[c].x < MARGIN_X; c++) {
      this.coords.splice(c, 1);
    }
  }

  moveLeft() {
    for (let c of this.coords) {
      c.x -= SPEED;
    }
  }

  isOffScreen() {
    return this.head.y < 0 || this.head.y > height;
  }

  render() {
    noFill();
    stroke(0);
    strokeWeight(3);

    beginShape();
    for (let c of this.coords) {
      vertex(c.x, c.y);
    }
    endShape();
  }
}

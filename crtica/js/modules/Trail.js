class Trail {
  constructor() {
    this.init();
  }

  init() {
    this.dir = 1;
    this.gravity = 0.2;
    this.speed = 0;

    this.head = createVector(200, 90); //  200, 0
    this.coords = [];

    // render a portion of the trail
    for (let i = 0; i < 90; i++) {
      this.update();
    }
  }

  update() {
    if (GAME_STATE === 'PLAYING') {
      this.dir = mainPressed() ? -1 : 1; // SPACE
    } else {
      if (abs(this.speed) > 5) {
        this.dir *= -1;
      }
    }

    this.computeY();
    this.computeVertices();
    this.moveLeft();

    if (this.isOffScreen() || lives.isDead) {
      GAME_STATE = 'GAME_OVER';
    }
  }

  computeY() {
    this.speed += this.gravity * this.dir;
    this.head.y += this.speed;
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

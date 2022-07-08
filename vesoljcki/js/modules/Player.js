class Player {
  constructor() {
    this.img = loadImage('images/lulek.png');
    this.h = 12;
    this.w = 14;

    this.minX = this.w / 2;
    this.maxX = width - this.w / 2;
    this.locX = width / 2;
  }

  update() {
    if (this.isDead()) {
      console.log('dead');
      noLoop();
    }

    let diff = DIR * SPEED;
    this.locX = min(max(this.locX + diff, this.minX), this.maxX);
  }

  isDead() {
    let headLoc = createVector(this.locX, height - this.h);
    return enemies.arr.some((e) => e.isHit(headLoc.x, headLoc.y));
  }

  render() {
    // fill(255);
    // noStroke();
    // rect(this.locX - this.w / 2, height - this.h, this.w, this.h);
    imageMode(CORNER);
    tint(255);
    image(this.img, this.locX - this.w / 2, height - this.h, this.w, this.h);
  }
}

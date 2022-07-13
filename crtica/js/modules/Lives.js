class Lives {
  constructor() {
    this.defaultLives = 3;
    this.LIVES = null;

    this.init();
  }

  get isDead() {
    return this.LIVES === 0;
  }

  init() {
    this.LIVES = this.defaultLives;
  }

  add(n) {
    this.LIVES += n;
  }

  decrease() {
    --this.LIVES;
  }

  render() {
    let margin = 15;
    let locY = margin; // px
    let locX;

    for (let i = 0; i < 3; ++i) {
      locX = margin + i * 20; // px
      stroke(0);
      if (i < this.LIVES) fill(255, 120, 120);
      else noFill();
      circle(locX, locY, 8);
    }
  }
}

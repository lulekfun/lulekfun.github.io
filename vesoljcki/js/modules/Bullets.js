class Bullet {
  constructor(xloc, yloc) {
    this.loc = createVector(xloc, yloc);
    this.speed = 2;
    this.damage = 1; // 3
  }

  update() {
    this.loc.y -= this.speed * SPEED;
  }

  destroy() {
    this.loc.y = -100;
  }

  render() {
    stroke(255);
    strokeWeight(4);
    point(this.loc.x, this.loc.y);
  }
}

class Bullets {
  constructor() {
    this.arr = [];
  }

  new(locX, locY) {
    let b = new Bullet(locX, locY);
    this.arr.push(b);
  }

  update() {
    this.arr.forEach((b) => b.update());

    // remove obsolete
    this.arr = this.arr.filter((b) => b.loc.y > PADDING_Y && b.damage > 0);
  }

  render() {
    this.arr.forEach((b) => b.render());
  }
}

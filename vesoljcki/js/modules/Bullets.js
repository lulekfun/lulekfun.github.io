class Bullet {
  constructor(xloc, yloc) {
    this.loc = createVector(xloc, yloc);
    this.speed = 6;
    this.damage = 1;
  }

  update() {
    this.loc.y -= this.speed;
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

    if (SHOTS) {
      let locX = player.locX;
      let locY = height - player.h;
      this.new(locX, locY);

      --SHOTS;
    }

    // remove obsolete
    this.arr = this.arr.filter((b) => b.loc.y > PADDING_Y && b.damage > 0);
  }

  render() {
    this.arr.forEach((b) => b.render());
  }
}

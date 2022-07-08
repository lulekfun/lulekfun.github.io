const _enemies = [
  { name: 'enemy_1', power: 3 },
  { name: 'enemy_2', power: 3 },
  { name: 'enemy_3', power: 3 },
  { name: 'enemy_4', power: 3 },
  { name: 'enemy_5', power: 1 },
  { name: 'enemy_6', power: 1 },
];

class Enemy {
  constructor() {
    let e = random(_enemies);
    this.img = loadImage(`images/${e.name}.png`);

    this.powerDefault = e.power; // random(3, 8);
    this.power = this.powerDefault;
    this.speed = 0.1;

    let locX = random(PADDING_X, width - PADDING_X);
    this.loc = createVector(locX, PADDING_Y);
  }

  get width() {
    return this.img.width * 2;
  }

  get height() {
    return this.img.height * 2;
  }

  get box() {
    return {
      top: this.loc.y - this.height / 2,
      bottom: this.loc.y + this.height / 2,
      left: this.loc.x - this.width / 2,
      right: this.loc.x + this.width / 2,
    };
  }

  damage(d) {
    this.power -= d;
    if (this.power < 1) this.remove();
  }

  remove() {
    this.loc.y = height + 100;
  }

  update() {
    this.loc.y += SPEED * this.speed;

    // check for being hit
    bullets.arr.forEach((b) => {
      if (this.isHit(b.loc.x, b.loc.y)) {
        --b.damage; // bullet loses some damage
        --this.power; // enemy loses some damage
      }
    });
  }

  isHit(x, y) {
    let b = this.box;
    return x > b.left && x < b.right && y > b.top && y < b.bottom;
  }

  render() {
    let c = lerpColor(color(0), color(255), this.power / this.powerDefault);
    tint(c);
    imageMode(CENTER);
    image(this.img, this.loc.x, this.loc.y, this.width, this.height);
  }
}

class Enemies {
  constructor() {
    this.arr = [];
  }

  new() {
    let e = new Enemy();
    this.arr.push(e);
  }

  update() {
    if (frameCount % 130 == 0) {
      this.new();
    }

    this.arr.forEach((e) => e.update());

    // check for game over
    if (this.arr.some((e) => e.box.bottom >= height)) gameOver();

    // remove obsolete
    this.arr = this.arr.filter((e) => e.loc.y < height - PADDING_Y && e.power > 0);
  }

  render() {
    this.arr.forEach((e) => e.render());
  }
}

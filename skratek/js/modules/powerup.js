const powerups = {
  goal: null,
  arr: [],
  get all_collected() {
    return this.arr.every((p) => p.is_collected);
  },
  init() {
    this.arr = [];
  },
  add(powerup) {
    this.arr.push(powerup);
  },
  update() {
    for (let p of this.arr) {
      if (!p.is_visible) continue;
      p.checkCollect(skrat.pos.x, skrat.pos.y);
    }

    this.goal.checkCollect(skrat.pos.x, skrat.pos.y);
  },
  render() {
    for (let p of this.arr) {
      if (!p.is_visible) continue;
      p.render();
    }

    this.goal.render();
  },
};

// --- CLASS DECLARATIONS

class Powerup {
  constructor(x, y) {
    this.floor_offset = 12; // px
    this.pos = { x, y: y + this.floor_offset };

    this.color = color(COLORS.MOLD);
    this.is_collected = false;
  }

  get is_visible() {
    return this.pos.y > CAMERA_HEIGHT && this.pos.y < CAMERA_HEIGHT + height;
  }

  checkCollect(x, y) {
    if (this.is_collected) return;

    const MAX_DISTANCE = 15;
    const collecting = dist(x, y, this.pos.x, this.pos.y) < MAX_DISTANCE;

    if (collecting) {
      this.onCollect();
    }
  }

  onCollect() {
    this.is_collected = true;
    this.color.setAlpha(80); // this.color = color(COLORS.MAGENTA);
  }

  render() {
    stroke(this.color);
    strokeWeight(7);
    point(this.pos.x, CAMERA_HEIGHT + height - this.pos.y);
  }
}

class Goal extends Powerup {
  constructor(x, y) {
    super(x, y);
    this.color = color(COLORS.ROSE_GOLD);
    this.radius = 7;
  }

  onCollect() {
    if (!powerups.all_collected) return;
    this.is_collected = true;
  }

  render() {
    if (this.is_collected) {
      this.radius += COEFF;

      const alpha = 360 - this.radius;
      this.color.setAlpha(alpha);

      if (alpha < -50) return init();
    }

    noStroke();
    fill(this.color);
    circle(this.pos.x, CAMERA_HEIGHT + height - this.pos.y, this.radius);
  }
}

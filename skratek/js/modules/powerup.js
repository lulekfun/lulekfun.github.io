const powerups = {
  goal: null,
  arr: [],
  get all_collected() {
    return this.arr.every((p) => p.ignore_collect || p.is_collected);
  },
  init() {
    this.arr = [];

    for (let i = 6; i < floors.arr.length; i += 7) {
      const fl = floors.arr[i];
      const pw = LEVEL > 2 && random() < 0.1 ? new NaughtyBall(fl) : new Powerup(fl);
      this.arr.push(pw);
      fl.powerup = pw;
    }

    this.goal = LEVEL === 10 ? new TerminalGoal(floors.podium) : new Goal(floors.podium);
  },
  update() {
    for (let p of this.arr) {
      if (!p.is_visible || p.is_collected) continue;
      p.update();
    }

    this.goal.update();
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
  constructor(floor) {
    this.floor_offset = 12; // px
    this.pos = {
      x: floor.pos.x,
      y: floor.pos.y + this.floor_offset,
    };

    this.color = color(COLORS.MOLD);
    this.is_collected = false;

    this.floor = floor;
  }

  get is_visible() {
    return this.pos.y > CAMERA_HEIGHT && this.pos.y < CAMERA_HEIGHT + height;
  }

  update() {
    this.checkCollect();
  }

  checkCollect() {
    if (this.is_collected) return; // TODO: remove? je ze v loopu

    const MAX_DISTANCE = 15;
    const collecting = dist(skrat.pos.x, skrat.pos.y, this.pos.x, this.pos.y) < MAX_DISTANCE;

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
  constructor(floor) {
    super(floor);
    this.color = color(COLORS.ROSE_GOLD);
    this.radius = 7;
  }

  onCollect() {
    if (!powerups.all_collected) return;
    this.is_collected = true;
  }

  update() {
    this.checkCollect();

    if (this.is_collected) {
      this.radius += COEFF;

      const alpha = 360 - this.radius;
      this.color.setAlpha(alpha);

      if (alpha < -50) init();
    }
  }

  render() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, CAMERA_HEIGHT + height - this.pos.y, this.radius);
  }
}

class TerminalGoal extends Goal {
  constructor(floor) {
    super(floor);
    this.color = color(COLORS.VIOLET);
    this.radius = 7;
  }

  update() {
    this.checkCollect();

    if (this.is_collected) {
      this.radius += COEFF;

      const alpha = 360 - this.radius;
      this.color.setAlpha(alpha);

      if (alpha < 0) this.radius = 0;
    }
  }
}

class NaughtyBall extends Powerup {
  constructor(floor) {
    super(floor);
    this.color = color(COLORS.RED);

    this.ignore_collect = true;
  }

  onCollect() {
    this.is_collected = true;
    this.color.setAlpha(80); // this.color = color(COLORS.MAGENTA);

    const type = random(['SHRINK', 'REVERSE', 'BUTTER']);

    if (type === 'SHRINK') FLOOR_WIDTH *= 0.8;
    else if (type === 'REVERSE') REVERSE = -1;
    else if (type === 'BUTTER') FRICTION /= 2;
  }
}

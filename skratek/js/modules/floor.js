let FLOOR_WIDTH = 40;

const floors = {
  arr: [],
  ground: null,
  podium: null,
  init() {
    this.arr = [];
    this.ground = new Ground(width / 2, 0, width);
    this.ground.is_visible = false;

    // prepare everything
    this.arr.push(new Floor(width - width / 5, FLOOR_HEIGHT)); // first floor

    for (let i = 2; i < FLOORS_NO; i++) {
      const y = i * FLOOR_HEIGHT;
      const x = random(MARGIN_X, width - MARGIN_X); // TESTING: random() < 0.5 ? 50 : width/2 + 50;

      const floor_type = randomFloorType(i);
      if (floor_type === 'NORMAL') fl = new Floor(x, y);
      else if (floor_type === 'MOVING') fl = new MovingFloor(x, y);
      else if (floor_type === 'SHY') fl = new ShyFloor(x, y);

      this.arr.push(fl);
    }

    this.podium = new Floor(width / 2, FLOORS_NO * FLOOR_HEIGHT); // last one is centered
  },
  update() {
    this.ground.update();
    this.podium.update();

    for (let f of [this.ground, ...this.arr, this.podium]) {
      if (f.is_visible) f.update();
    }
  },
  render() {
    for (let f of [...this.arr, this.podium]) {
      if (f.is_visible) f.render();
    }
  },
};

// --- CLASS DECLARATIONS

class Floor {
  constructor(x, y, w) {
    this.width = w || FLOOR_WIDTH; // 40
    this.pos = { x, y };
  }

  get is_visible() {
    return this.pos.y > CAMERA_HEIGHT && this.pos.y < CAMERA_HEIGHT + height;
  }

  get start() {
    return this.pos.x - this.width / 2;
  }

  get end() {
    return this.pos.x + this.width / 2;
  }

  update() {
    this.width = lerp(this.width, FLOOR_WIDTH, 0.1);
    this.checkIntersection();
  }

  checkIntersection() {
    if (skrat.y_speed >= 0) return;
    if (skrat.pos.y > this.pos.y || skrat.pos.y < this.pos.y - 200) return;

    const crossing =
      this.intersects(
        // left bottom border (prev -> cur)
        skrat.prev_pos.x - skrat.img_width / 3,
        skrat.prev_pos.y, // - skrat.img_height/2,
        skrat.pos.x - skrat.img_width / 3,
        skrat.pos.y // - skrat.img_height/2,
      ) ||
      this.intersects(
        // right bottom border (prev -> cur)
        skrat.prev_pos.x + skrat.img_width / 3,
        skrat.prev_pos.y, // + skrat.img_height/2,
        skrat.pos.x + skrat.img_width / 3,
        skrat.pos.y // + skrat.img_height/2,
      );

    if (crossing) {
      this.onIntersection();
    }
  }

  intersects(x1, y1, x2, y2) {
    return linesIntersect(x1, y1, x2, y2, this.start, this.pos.y, this.end, this.pos.y);
  }

  onIntersection() {
    skrat.jump(this.pos.x, this.pos.y);
  }

  render() {
    strokeCap(SQUARE);
    stroke(0);
    strokeWeight(3);
    noFill();

    line(this.start, CAMERA_HEIGHT + height - this.pos.y, this.end, CAMERA_HEIGHT + height - this.pos.y);
  }
}

class Ground extends Floor {
  constructor(x, y, w) {
    super(x, y, w);
  }

  update() {
    this.checkIntersection();
  }
}

class MovingFloor extends Floor {
  constructor(x, y, w, dir) {
    super(x, y, w);

    this.dir = dir || random() < 0.5 ? 1 : -1;
  }

  update() {
    this.pos.x = -this.width + ((this.pos.x + this.dir * COEFF + width + 3 * this.width) % (width + 2 * this.width));
    if (this.powerup) this.powerup.pos.x = this.pos.x;

    this.checkIntersection();
  }
}

class ShyFloor extends Floor {
  constructor(x, y, w) {
    super(x, y, w);

    this.target_x = x;
  }

  update() {
    this.checkIntersection();
    this.pos.x = lerp(this.pos.x, this.target_x, 0.1);
    if (this.powerup) this.powerup.pos.x = this.pos.x;
  }

  onIntersection() {
    skrat.jump(this.pos.x, this.pos.y);
    this.target_x = random(MARGIN_X, width - MARGIN_X);
  }
}

// --- UTILS

function linesIntersect(a, b, c, d, p, q, r, s) {
  // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 <= lambda && lambda <= 1 && 0 <= gamma && gamma <= 1;
  }
}

function randomFloorType(floor_no) {
  // pri 30 je 5% verjetnost, pri 100 pa 20%
  const probability = map(minmax(floor_no, 30, 100), 30, 100, 0.05, 0.2);

  if (floor_no > 30 && random() < probability) {
    return random() < 0.5 ? 'MOVING' : 'SHY';
  }
  return 'NORMAL';
}

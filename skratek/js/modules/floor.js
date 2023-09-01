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

      const FLOORS = {
        NORMAL: Floor,
        MOVING: MovingFloor,
        ALTERNATING: AlternatingFloor,
        SHY: ShyFloor,
        MIRROR: MirrorFloor,
      };

      const fl = new FLOORS[randomFloorType(i)](x, y);

      this.arr.push(fl);
    }

    this.podium = new Floor(width / 2, FLOORS_NO * FLOOR_HEIGHT); // last one is centered
  },
  update() {
    this.ground.update();
    this.podium.update();

    for (let f of [this.ground, ...this.arr, this.podium]) {
      if (f.is_visible || skrat.falling) f.update();
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
  constructor(x, y) {
    this.width = FLOOR_WIDTH; // 40
    this.pos = { x, y };
  }

  get is_visible() {
    return this.pos.y + 10 > CAMERA_HEIGHT && this.pos.y - 10 < CAMERA_HEIGHT + height;
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
  constructor(x, y) {
    super(x, y);
    this.width = width;
  }

  update() {
    this.checkIntersection();
  }

  onIntersection() {
    skrat.jump(this.pos.x, this.pos.y);
    heal(); // HEAL .. remove naughty side effects
  }
}

class MovingFloor extends Floor {
  constructor(x, y) {
    super(x, y);

    this.offset = x;
    this.dir = random([-1, 1]);
  }

  update() {
    this.width = lerp(this.width, FLOOR_WIDTH, 0.1);

    this.offset = (width + this.offset + COEFF * this.dir) % width;
    this.pos.x = map(this.offset, 0, width, -this.width / 2, width + this.width / 2);
    if (this.powerup) this.powerup.pos.x = this.pos.x;

    this.checkIntersection();
  }
}

class AlternatingFloor extends MovingFloor {
  constructor(x, y) {
    super(x, y);
  }

  onIntersection() {
    skrat.jump(this.pos.x, this.pos.y);
    this.dir *= -1;
  }
}

class ShyFloor extends Floor {
  constructor(x, y) {
    super(x, y);

    this.target_x = x;
  }

  update() {
    this.width = lerp(this.width, FLOOR_WIDTH, 0.1);

    this.pos.x = lerp(this.pos.x, this.target_x, 0.1);
    if (this.powerup) this.powerup.pos.x = this.pos.x;

    this.checkIntersection();
  }

  onIntersection() {
    skrat.jump(this.pos.x, this.pos.y);
    this.target_x = random(MARGIN_X, width - MARGIN_X);
  }
}

class MirrorFloor extends Floor {
  constructor(x, y) {
    super(x, y);

    this.offset = x - width / 2;
  }

  update() {
    this.width = lerp(this.width, FLOOR_WIDTH, 0.1);

    const reverse_x = (this.offset - skrat.pos.x + 2 * width) % width;
    this.pos.x = map(reverse_x, 0, width, -this.width / 2, width + this.width / 2);
    if (this.powerup) this.powerup.pos.x = this.pos.x;

    this.checkIntersection();
  }
}

// --- UTILS

function linesIntersect(a, b, c, d, p, q, r, s) {
  // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
  const det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) return false;

  const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
  const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
  return 0 <= lambda && lambda <= 1 && 0 <= gamma && gamma <= 1;
}

function randomFloorType(floor_no) {
  // pri 20 je 0% verjetnost, pri 250 pa 50%
  const probability = map(floor_no, 20, 250, 0, 1);

  // return 'ALTERNATING';
  // return random(['MIRROR', 'NORMAL']);

  if (floor_no >= floorsNo(MAX_LEVEL) - 20) return 'MOVING';

  if (random() < probability) {
    return random(['MOVING', 'SHY', 'MIRROR']);
  }
  return 'NORMAL';
}

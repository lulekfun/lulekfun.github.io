class Floor {
  constructor(x, y, w) {
    this.x = x || random(MARGIN_X, width - MARGIN_X); // prod
    this.y = y;
    this.width = w || 50;

    // this.start = this.x - this.width / 2;
    // this.end = this.x + this.width / 2;
  }

  get is_visible() {
    return this.y > CAMERA_HEIGHT && this.y < CAMERA_HEIGHT + height;
  }

  get start() {
    return this.x - this.width / 2;
  }

  get end() {
    return this.x + this.width / 2;
  }

  crosses(x1, y1, x2, y2) {
    return intersects(x1, y1, x2, y2, this.start, this.y, this.end, this.y);
  }

  render() {
    if (!this.is_visible) return; // do not render but also not break

    strokeCap(SQUARE);
    stroke(0);
    strokeWeight(3);
    noFill();

    line(this.start, CAMERA_HEIGHT + height - this.y, this.end, CAMERA_HEIGHT + height - this.y);
  }
}

function intersects(a, b, c, d, p, q, r, s) {
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

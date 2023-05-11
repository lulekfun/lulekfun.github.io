class Powerup {
  constructor(x, y) {
    this.floor_offset = 12; // px
    this.loc = { x, y: y + this.floor_offset };

    this.color = color(COLORS.CYAN);
    this.is_collected = false;
  }

  checkCollect(x, y) {
    if (this.is_collected) return;

    const MAX_DISTANCE = 15;
    const collecting = dist(x, y, this.loc.x, this.loc.y) < MAX_DISTANCE;

    if (collecting) {
      this.is_collected = true;
      this.onCollect();
    }
  }

  onCollect() {
    this.color.setAlpha(80);
    // this.color = color(COLORS.MAGENTA);
  }

  render() {
    stroke(this.color);
    strokeWeight(7);
    point(this.loc.x, CAMERA_HEIGHT + height - this.loc.y);
  }
}

class Goal extends Powerup {
  constructor(x, y) {
    super(x, y);
    this.color = color(COLORS.GOLD);
    this.radius = 7;
  }

  onCollect() {
    FLOORS_NO *= 2;
  }
  
  render() {
    if (this.is_collected) {
      this.radius++;

      const alpha = 360 - this.radius;
      this.color.setAlpha(alpha);

      if (alpha < -50) return init();
    }

    noStroke();
    fill(this.color);
    circle(this.loc.x, CAMERA_HEIGHT + height - this.loc.y, this.radius);
  }
}

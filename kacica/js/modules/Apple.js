class Apple {
  constructor() {
    this.coords = createVector(random(width), random(height));
    this.width = 3;
  }

  new() {
    let randX = random(MARGIN_X, width - MARGIN_X);
    let randY = random(MARGIN_Y, width - MARGIN_Y);
    this.coords.set(randX, randY);
  }

  render() {
    stroke(0, 255, 0);
    strokeWeight(this.width);
    point(this.coords.x, this.coords.y);
  }
}

class Apple {
  constructor() {
    this.coords = createVector(random(width), random(height));
    this.width = 3;
  }

  new() {
    this.coords.set(random(width), random(height));
  }

  render() {
    stroke(0, 255, 0);
    strokeWeight(this.width);
    point(this.coords.x, this.coords.y);
  }
}

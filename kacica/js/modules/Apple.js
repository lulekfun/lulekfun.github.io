class Apple {
  constructor() {
    this.width = 3;
    this.coords = null;

    this.new();
  }

  new() {
    let ok = false;
    let v;

    while (!ok) {
      let randX = random(MARGIN_X, width - MARGIN_X);
      let randY = random(MARGIN_Y, height - MARGIN_Y);

      v = createVector(randX, randY);

      for (let c of snake.coords) {
        if (c.dist(v) < 10) {
          ok = false;
          break;
        } else {
          ok = true;
        }
      }
    }

    this.coords = v;
  }

  render() {
    stroke(0, 255, 0);
    if (GAME_STATE === 'GAME_OVER') stroke(225, 65, 65);
    strokeWeight(this.width);
    point(this.coords.x, this.coords.y);
  }
}

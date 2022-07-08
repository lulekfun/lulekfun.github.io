class Score {
  constructor() {
    this.SCORE = 0;
  }

  add(s) {
    this.SCORE += s;
  }

  render() {
    fill(240);
    noStroke();
    textFont('Menlo');
    textSize(16);
    textAlign(CENTER, CENTER);
    text('' + this.SCORE, width / 2, height / 2);
  }
}

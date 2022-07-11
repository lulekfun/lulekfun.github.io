class Score {
  constructor() {
    this.SCORE = 0;
  }

  add(s) {
    this.SCORE += s;
  }

  render() {
    fill(0);
    noStroke();
    textFont('Menlo');
    textSize(15);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    text(`${this.SCORE}`, width - 10, 10);
  }
}

class Score {
  constructor() {
    this.SCORE = 0;
    this.HIGH_SCORE = 0;

    this.KEYWORD = 'CRTICA_HIGH';
  }

  init() {
    this.SCORE = 0;
  }

  add(n) {
    this.SCORE += n;
    this.setHigh();
  }

  getHigh() {
    return localStorage.getItem(this.KEYWORD) || 0;
  }

  setHigh() {
    localStorage.setItem(this.KEYWORD, max(this.SCORE, this.getHigh()));
  }

  render() {
    let margin = 7; // px
    fill(0);
    noStroke();
    textFont('Menlo, Consolas, monospace');
    textSize(15);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    text(`${this.SCORE}`, width - margin - 2, margin);
  }
}

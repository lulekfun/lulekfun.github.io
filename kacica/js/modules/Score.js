class Score {
  get() {
    return snake.length - snake.initialLength;
  }

  render() {
    if (GAME_STATE === 'PLAYING') fill(75);
    else if (GAME_STATE === 'GAME_OVER') fill(200, 0, 0);
    noStroke();
    textFont('Menlo, Consolas, monospace');
    textSize(14);
    textAlign(CENTER, CENTER);
    text(this.get(), width / 2, height / 2);
  }
}

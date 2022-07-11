class Progress {
  constructor() {
    this.element = document.querySelector('progress');

    this.min = 0;
    this.max = 120; // 100
    this.value = 0;

    this.element.max = this.max;
    this.element.value = this.value;

    this.targetValue = 0;
  }

  get isFull() {
    return this.value >= this.max;
  }

  update() {
    // progress
    if (this.isFull) {
      powerups.random();
      progress.reset();
      ++LEVEL;
    }
  }

  add(val) {
    this.targetValue = max(0, this.targetValue + val);
  }

  set(val) {
    this.targetValue = val;
  }

  reset() {
    this.targetValue = 0;
  }

  render() {
    this.value = lerp(this.value, this.targetValue, 0.1);
    this.element.value = this.value;
  }
}

function sign(n) {
  if (n === 0) return 0;
  return n < 0 ? 1 : -1;
}

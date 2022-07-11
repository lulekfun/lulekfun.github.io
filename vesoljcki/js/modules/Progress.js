class Progress {
  constructor() {
    this.element = document.querySelector('progress');

    this.max = 100; // 100
    this.value = 0;

    this.element.max = this.max;
    this.element.value = this.value;

    this.targetValue = 0;
  }

  get isFull() {
    return this.value === this.max;
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
    this.targetValue += val;
  }

  set(val) {
    this.targetValue = val;
  }

  reset() {
    this.value = 0;
    this.targetValue = 0;
  }

  render() {
    let speed = 0.2;

    this.value += sign(this.value - this.targetValue) * speed;
    this.value = min(this.max, max(0, this.value));

    this.element.value = this.value;
  }
}

function sign(n) {
  if (n == 0) return 0;
  return n < 0 ? 1 : -1;
}

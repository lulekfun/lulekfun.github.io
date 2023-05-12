class Progress {
  constructor() {
    this.element = document.querySelector('progress');

    this.value = 0;
    this.target_value = 0;

    this.element.value = 0;
    this.element.max = 1;
  }

  update() {
    this.target_value = skrat.floor / FLOOR_HEIGHT / FLOORS_NO;
  }

  render() {
    this.value = lerp(this.value, this.target_value, 0.1);
    this.element.value = this.value;
  }
}

// --- UTILS

function sign(n) {
  if (n === 0) return 0;
  return n < 0 ? 1 : -1;
}

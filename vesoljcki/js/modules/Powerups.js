class Powerups {
  constructor() {
    this.arr = [
      {
        name: 'bullets3',
        duration: 20 * 1000,
        onStart() {
          BG_COLOR = color(0, 20, 20);
          SHOT_NO = 3;
        },
        onEnd() {
          BG_COLOR = color(0);
          SHOT_NO = 1;
        },
      },
      {
        name: 'bullets10',
        duration: 10 * 1000,
        onStart() {
          SHOT_NO = 10;
          BG_COLOR = color(20, 0, 20);
        },
        onEnd() {
          SHOT_NO = 1;
          BG_COLOR = color(0);
        },
      },
    ];
  }

  random() {
    let randomPowerup = random(this.arr).name;
    this.activate(randomPowerup);
  }

  activate(name) {
    let timeout;
    let p = this.arr.find((p) => p.name === name);
    if (p) timeout = p.duration;
    else throw new Error("powerup doesn't exist");

    p.onStart();
    setTimeout(p.onEnd, timeout);
  }
}

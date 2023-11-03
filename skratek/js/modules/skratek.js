let GRAVITY = 0.3;
let FRICTION = 0.15; // 0 -> 1 [0.15]
let DIR = 1; // -1 if reversed

class Skratek {
  constructor() {
    this.pos = {
      x: width / 2,
      y: 0,
    };

    this.prev_pos = { ...this.pos };

    this.x_max_speed = 2; // MOVE SPEED (px/frame)
    this.x_speed = 0; // actual speed right now

    this.y_power = 6; // JUMP POWER
    this.y_speed = this.y_power; // START POWER; changes with bouncing
    this.max_y = 0;
    this.floor = 0;

    this.img = loadImage(`./img/skratek_prozoren.png`, this.initImg.bind(this));
    this.img_scale = 2;
  }

  get x_dir() {
    return DIR * (keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW));
  }

  get falling() {
    return this.pos.y < this.floor;
  }

  get level() {
    if (this.pos.y > this.floor) return this.floor;
    return this.pos.y - (this.pos.y % FLOOR_HEIGHT);
  }

  initImg() {
    this.img_width = this.img.width * this.img_scale;
    this.img_height = this.img.height * this.img_scale;
  }

  jump(x, y) {
    this.pos.y = y;
    this.floor = y;
    this.y_speed = this.y_power;
  }

  update() {
    this.prev_pos = { ...this.pos };

    // compute x position
    this.x_speed = lerp(this.x_speed, this.x_max_speed * this.x_dir * COEFF, FRICTION * COEFF);
    this.pos.x = (this.pos.x + this.x_speed + width) % width;

    if (powerups.goal.is_collected) {
      // finished => move slowly into center
      this.x_max_speed = 0;
      this.pos.x = lerp(this.pos.x, width / 2, 0.01 * COEFF);
    }

    // compute y position
    this.pos.y += this.y_speed * COEFF;
    this.y_speed -= GRAVITY * COEFF;

    this.max_y = max(this.max_y, this.pos.y);
  }

  render() {
    const pos_y = CAMERA_HEIGHT + height - this.pos.y - this.img_width / 2;
    imageMode(CENTER);
    image(this.img, this.pos.x, pos_y, this.img_width, this.img_height);
    image(this.img, this.pos.x + width, pos_y, this.img_width, this.img_height); // overlapping
    image(this.img, this.pos.x - width, pos_y, this.img_width, this.img_height); // overlapping
  }
}

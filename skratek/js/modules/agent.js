class Agent {
  constructor() {
    this.pos = {
      x: width / 2,
      y: 0,
    };

    this.prev_pos = { ...this.pos };

    this.x_dir = 0;
    this.x_max_speed = 1.5; // MOVE SPEED (px/frame)
    this.x_speed = 0; // actual speed right now

    this.y_power = 6; // JUMP POWER
    this.y_speed = this.y_power; // START POWER; changes with bouncing
    this.max_y = 0;
    this.level = 0;

    this.img = loadImage(`./img/skratek.png`, this.initImg.bind(this));
    this.img_scale = 2;
  }

  initImg() {
    this.img_width = this.img.width * this.img_scale;
    this.img_height = this.img.height * this.img_scale;

    //this.top = this.pos.y - this.img_height/2;
    //this.bottom = this.pos.y + this.img_height/2;
    //this.left = this.pos.x - this.img_width/2;
    //this.right = this.pos.x + this.img_width/2;
  }

  update() {
    this.prev_pos = { ...this.pos };

    // compute x position
    this.checkKeys();
    this.x_speed = lerp(this.x_speed, this.x_max_speed * this.x_dir * COEFF, FRICTION);
    this.pos.x = (this.pos.x + this.x_speed + width) % width;

    // compute y position
    this.pos.y += this.y_speed * COEFF;
    this.y_speed -= GRAVITY * COEFF;

    // check for intersections .. JUMP
    if (this.y_speed < 0) {
      for (let f of [ground, ...floors]) {
        if (
          f.crosses(
            // left bottom border (prev -> cur)
            this.prev_pos.x - this.img_width / 2,
            this.prev_pos.y, // - this.img_height/2,
            this.pos.x - this.img_width / 2,
            this.pos.y, // - this.img_height/2,

            // right bottom border (prev -> cur)
            this.prev_pos.x + this.img_width / 2,
            this.prev_pos.y, // + this.img_height/2,
            this.pos.x + this.img_width / 2,
            this.pos.y // + this.img_height/2,
          )
        ) {
          this.pos.y = f.y;
          this.level = f.y;
          this.y_speed = this.y_power;
          break;
        }
      }
    }

    // check for powerups
    for (let p of powerups) {
      p.checkCollect(this.pos.x, this.pos.y);
    }

    this.max_y = max(this.max_y, this.pos.y);
    // this.level = this.pos.y - (this.pos.y % FLOOR_HEIGHT);
  }

  checkKeys() {
    this.x_dir = keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW);
  }

  render() {
    const pos_y = CAMERA_HEIGHT + height - this.pos.y - this.img_width / 2;
    imageMode(CENTER);
    image(this.img, this.pos.x, pos_y, this.img_width, this.img_height);
  }
}

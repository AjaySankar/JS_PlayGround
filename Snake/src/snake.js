/*eslint no-mixed-operators: 0 */
export default class Snake {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 5;
    this.height = 5;
    this.length = 10;
    this.head = {
      x: this.length * this.width,
      y: this.gameHeight - this.height
    };
    this.maxSpeed = 5;
    this.speed = {
      x: 0,
      y: 0
    };
    this.body = [];
    for (let i = 1; i <= this.length; i++) {
      this.body.push({
        x: this.head.x - i * this.width,
        y: this.gameHeight - this.height
      });
    }
  }
  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.head.x, this.head.y, this.width, this.height);
    this.body.forEach(b => {
      ctx.fillStyle = '#000';
      ctx.fillRect(b.x, b.y, this.width, this.height);
    });
  }
  update() {
    //donot update anything when the snake is not moving
    if (!this.speed.x && !this.speed.y) {
      return;
    }
    //stop the snake when it hits verical or horizontal walls
    if (
      (this.head.x + this.width === this.gameWidth && this.speed.x > 0) ||
      (this.head.x === 0 && this.speed.x < 0)
    ) {
      this.stop();
      return;
    }
    if (
      (this.head.y + this.width === this.gameHeight && this.speed.y > 0) ||
      (this.head.y === 0 && this.speed.y < 0)
    ) {
      this.stop();
      return;
    }
    //when the snake bites itself then reduce lives
    this.body.forEach(({ x, y }) => {
      if (x === this.head.x && y === this.head.y) {
        window.console.log('Ouch!!!');
        this.game.lives--;
      }
    });
    //when the snake eats food grow its size
    if (this.didEatFood()) {
      this.game.score++;
      window.console.log('Delicious');
      this.body.push({
        x: this.head.x - this.length * this.width,
        y: this.head.y - this.height
      });
      this.game.food.isEaten = true;
    }
    //move the snake such that each body part follows the part infront of it
    let { x, y } = this.head;
    this.head.x += this.speed.x;
    this.head.y += this.speed.y;
    this.body = this.body.map((b, index) => ({
      x: index ? this.body[index - 1].x : x,
      y: index ? this.body[index - 1].y : y
    }));
  }
  didEatFood() {
    return (
      this.head.x <= this.game.food.x &&
      this.game.food.x <= this.head.x + this.width &&
      this.head.y <= this.game.food.y &&
      this.game.food.y <= this.head.y + this.width
    );
  }
  moveLeft() {
    //if it is already moving right OR if it is parallel to X-axis has stopped at horizontal walls then donot move left
    if (
      this.speed.x > 0 ||
      (this.head.x + this.width === this.gameWidth &&
        this.head.y === this.body[0].y)
    ) {
      return;
    }
    this.speed.y = 0;
    this.speed.x = -this.maxSpeed;
  }
  //if it is already moving left OR if it is parallel to X-axis has stopped at horizontal walls then donot move right
  moveRight() {
    if (
      this.speed.x < 0 ||
      (this.head.x === 0 && this.head.y === this.body[0].y)
    ) {
      return;
    }
    this.speed.y = 0;
    this.speed.x = Number(this.maxSpeed);
  }
  //if it is already moving down OR if it is parallel to Y-axis has stopped at vertical walls then donot move up
  moveUp() {
    if (
      this.speed.y > 0 ||
      (this.head.y + this.width === this.gameHeight &&
        this.head.x === this.body[0].x)
    ) {
      return;
    }
    this.speed.x = 0;
    this.speed.y = -this.maxSpeed;
  }
  //if it is already moving up OR if it is parallel to Y-axis has stopped at verical walls then donot move down
  moveDown() {
    if (
      this.speed.y < 0 ||
      (this.head.y === 0 && this.head.x === this.body[0].x)
    ) {
      return;
    }
    this.speed.x = 0;
    this.speed.y = Number(this.maxSpeed);
  }
  stop() {
    this.speed.x = 0;
    this.speed.y = 0;
  }
}

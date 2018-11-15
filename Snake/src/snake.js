/*eslint no-mixed-operators: 0 */
export default class Snake {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 5;
    this.height = 5;
    this.length = 50;
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
  getRandomArbitrary(min, max) {
    const rand = Math.floor(Math.random() * (max - min) + min);
    let rem = rand % this.maxSpeed;
    return (rand + rem) % this.maxSpeed === 0 ? rand + rem : rand - rem;
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
    if (!this.speed.x && !this.speed.y) {
      return;
    }
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
    this.body.forEach(({ x, y }) => {
      if (x === this.head.x && y === this.head.y) {
        window.console.log('Ouch!!!');
        this.game.lives--;
      }
    });
    if (this.didEatFood()) {
      window.console.log('Delicious');
      this.body.push({
        x: this.head.x - this.length * this.width,
        y: this.head.y - this.height
      });
      this.game.food.isEaten = true;
    }
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
    if (this.speed.x > 0) {
      return;
    }
    this.speed.y = 0;
    this.speed.x = -this.maxSpeed;
  }
  moveRight() {
    if (this.speed.x < 0) {
      return;
    }
    this.speed.y = 0;
    this.speed.x = Number(this.maxSpeed);
  }
  moveUp() {
    if (this.speed.y > 0) {
      return;
    }
    this.speed.x = 0;
    this.speed.y = -this.maxSpeed;
  }
  moveDown() {
    if (this.speed.y < 0) {
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

export default class Snake {
  constructor(width, height) {
    this.gameWidth = width;
    this.gameHeight = height;
    this.width = 5;
    this.height = 5;
    this.padding = 0;
    this.length = 10;
    this.head = {
      x: this.length * (this.width + this.padding),
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
        x: this.head.x - i * (this.width + this.padding),
        y: this.gameHeight - this.height
      });
    }
    this.food = {
      x: 0, //this.getRandomArbitrary(10, this.gameWidth),
      y: 0 //this.gameHeight //this.getRandomArbitrary(10, this.gameHeight)
    };
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.head.x, this.head.y, this.width, this.height);
    this.body.forEach(b => {
      ctx.fillStyle = '#000';
      ctx.fillRect(b.x, b.y, this.width, this.height);
    });
    ctx.fillStyle = '#000';
    ctx.fillRect(this.food.x, this.food.y, this.width, this.height);
  }
  update() {
    if (!this.speed.x && !this.speed.y) {
      return;
    }
    if (this.head.x === this.food.x + this.speed.x) {
      window.console.log('Delicious');
      this.body.push({
        x: this.head.x - this.length * (this.width + this.padding),
        y: this.head.y - this.height
      });
      this.food.x = this.getRandomArbitrary(10, this.gameWidth);
      this.food.y = this.getRandomArbitrary(10, this.gameHeight);
    }
    let { x, y } = this.head;
    this.head.x += this.speed.x;
    this.head.y += this.speed.y;
    this.body = this.body.map((b, index) => ({
      x: index ? this.body[index - 1].x : x,
      y: index ? this.body[index - 1].y : y
    }));
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

export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 150;
    this.height = 30;
    this.maxSpeed = 10;
    this.speed = 0;
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }

  draw(ctx) {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = Number(this.maxSpeed);
  }

  stop() {
    this.speed = 0;
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}

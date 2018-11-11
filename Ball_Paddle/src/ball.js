import { detectCollision } from './collisionDetection.js';

export default class Ball {
  constructor(game) {
    this.image = document.getElementById('img_ball');
    this.size = 16;
    this.gameWidth = game.gameWidth;
    this.gameHeigth = game.gameHeight;
    this.game = game;
    this.reset();
  }

  reset(){
    this.position = {
      x: 250,
      y: 250
    };
    this.speed = {
      x: 6,
      y: -6
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //check collision with left or right of the screen
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    //check collision with wall on top or bottom
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size > this.gameHeigth) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}

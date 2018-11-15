/*eslint no-mixed-operators: 0 */
export default class Food {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 5;
    this.height = 5;
    this.x = this.getRandomArbitrary(0, this.gameWidth);
    this.y = this.getRandomArbitrary(0, this.gameHeight);
    this.isEaten = false;
  }

  update() {
    if (this.isEaten) {
      this.x = this.getRandomArbitrary(0, this.gameWidth);
      this.y = this.getRandomArbitrary(0, this.gameHeight);
      this.isEaten = false;
    }
  }

  getRandomArbitrary(min, max) {
    const rand = Math.floor(Math.random() * (max - min) + min);
    let rem = rand % this.width;
    return (rand + rem) % this.width === 0 ? rand + rem : rand - rem;
  }

  draw(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

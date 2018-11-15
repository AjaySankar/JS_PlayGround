export default class Food {
  constructor(width, height){
    this.gameWidth = width;
    this.gameHeight = height;
    this.width = 5;
    this.height = 5;
    this.food = {
      x: this.getRandomArbitrary(0, this.gameWidth),
      y: this.getRandomArbitrary(0, this.gameHeight)
    };
  }

  update() {
    this.food.x = this.getRandomArbitrary(0, this.gameWidth);
    this.food.y = this.getRandomArbitrary(0, this.gameHeight);
  }

  getRandomArbitrary(min, max) {
    const rand = Math.floor(Math.random() * (max - min) + min);
    let rem = rand % this.width;
    return (rand + rem) % this.width === 0 ? rand + rem : rand - rem;
  }

  draw(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.food.x, this.food.y, this.width, this.height);
  }
}

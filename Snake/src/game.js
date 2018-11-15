import Snake from './snake.js';
import InputHandler from './input.js';
import Food from './food.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight, scoreBoard) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.food = new Food(this);
    this.snake = new Snake(this);
    this.gameObjects = [];
    this.lives = 3;
    new InputHandler(this.snake, this);
    this.scoreBoard = scoreBoard;
    this.score = 0;
  }
  start() {
    if (this.gameState !== GAMESTATE.MENU) {
      return;
    }
    this.gameObjects.push(this.snake);
    this.gameObjects.push(this.food);
    this.gameState = GAMESTATE.RUNNING;
  }
  update() {
    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      return;
    }
    [...this.gameObjects].forEach(object => object.update());
  }
  draw(ctx) {
    this.scoreBoard.innerHTML = `<h3> Your Score is: ${this.score} </h3> <br> <h3> Your lives left are: ${this.lives} </h3>`;
    [...this.gameObjects].forEach(object => object.draw(ctx));
    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Press SPACEBAR to start',
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(255,0,0,1)';
      ctx.fill();
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('GAMEOVER', this.gameWidth / 2, this.gameHeight / 2);
    }
  }
  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}

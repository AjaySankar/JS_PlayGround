import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import { buildLevel, level1 } from './level.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  GAMEWON: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    new InputHandler(this.paddle, this);
  }
  start() {
    if (this.gameState !== GAMESTATE.MENU) {
      return;
    }
    this.bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle];
    this.gameState = GAMESTATE.RUNNING;
  }

  update() {
    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.GAMEWON
    ) {
      return;
    }
    this.bricks = this.bricks.filter(object => !object.markForDeletion);
    if (this.bricks.length === 0) {
      this.gameState = GAMESTATE.GAMEWON;
    }
    [...this.gameObjects, ...this.bricks].forEach(object => object.update());
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
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

    if (this.gameState === GAMESTATE.GAMEWON) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,255,0,1)';
      ctx.fill();
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('YOU WON !!!', this.gameWidth / 2, this.gameHeight / 2);
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

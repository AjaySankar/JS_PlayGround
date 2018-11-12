import Snake from './snake.js';
import InputHandler from './input.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let snake = new Snake(GAME_WIDTH, GAME_HEIGHT);
new InputHandler(snake);

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  snake.draw(ctx);
  snake.update();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

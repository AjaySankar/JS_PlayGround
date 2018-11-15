import Game from './game.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
let scoreBoard = document.getElementById('scoreScreen');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, scoreBoard);

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

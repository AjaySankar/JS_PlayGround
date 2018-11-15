export default class InputHandler {
  constructor(snake, game) {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          snake.moveLeft();
          break;
        case 38:
          snake.moveUp();
          break;
        case 39:
          snake.moveRight();
          break;
        case 40:
          snake.moveDown();
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
        default:
          break;
      }
    });
  }
}

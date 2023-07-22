import GameOfLife from "./GameOfLife.js";

const startGameOfLife = () => {
  const game = new GameOfLife(25);
  game.createDeadGrid();
  game.populateDeadGrid(0.32);
  document.querySelector(".game-container").innerHTML = game.displayState();
};

startGameOfLife();

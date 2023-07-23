import GameOfLife from "./GameOfLife.js";

const dimensionSquareGrid = 30;
const initialPopulationRate = 0.14;
const numberGenerations = 10 ** 4;
const speedTransition = 600;
const lifePattern = "🔵";
const deathPattern = "⚫";
let countTransitions = 1;

const game = new GameOfLife(dimensionSquareGrid, lifePattern, deathPattern);
game.createDeadGrid();
game.populateDeadGrid(initialPopulationRate);

const startGameOfLife = () => {
  const gameFormatted = game.displayState();
  const gameContainer = document.querySelector(".game-container");
  setTimeout(() => {
    gameContainer.innerHTML = gameFormatted;
  }, countTransitions * speedTransition);

  game.changeStateGrid();
};

for (let generation = 0; generation <= numberGenerations; generation++) {
  startGameOfLife();
  countTransitions++;
}

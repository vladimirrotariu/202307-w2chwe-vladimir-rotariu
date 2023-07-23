import GameOfLife from "./GameOfLife.js";

const dimensionSquareGrid = 25;
const initialPopulationRate = 0.21;
const numberGenerations = 10 ** 5;
let countTransitions = 0;

const game = new GameOfLife(dimensionSquareGrid);

const startGameOfLife = () => {
  game.populateDeadGrid(initialPopulationRate);
  const gameFormatted = game.displayState();

  const delayStates = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, countTransitions * 1400);
  });

  delayStates.then(() => {
    document.querySelector(".game-container").innerHTML = gameFormatted;
  });
};

for (let generation = 0; generation <= numberGenerations; generation++) {
  startGameOfLife();
  countTransitions++;
}

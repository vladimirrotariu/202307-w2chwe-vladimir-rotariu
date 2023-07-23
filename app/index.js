import GameOfLife from "./GameOfLife.js";

const dimensionSquareGrid = 30;
const initialPopulationRate = 0.15;
const numberGenerations = 10 ** 4;
const speedTransition = 600;
const lifePattern = "🔵";
const deathPattern = "⚫";

const startGameOfLife = () => {
  let countTransitions = 1;
  const game = new GameOfLife(dimensionSquareGrid, lifePattern, deathPattern);
  game.createDeadGrid();
  game.populateDeadGrid(initialPopulationRate);

  const getGameOfLifeState = () => {
    const gameFormatted = game.displayState();
    const gameContainer = document.querySelector(".game-container");
    setTimeout(() => {
      gameContainer.innerHTML = gameFormatted;
    }, countTransitions * speedTransition);

    game.changeStateGrid();
  };

  for (let generation = 0; generation <= numberGenerations; generation++) {
    getGameOfLifeState();
    countTransitions++;
  }
};

startGameOfLife();

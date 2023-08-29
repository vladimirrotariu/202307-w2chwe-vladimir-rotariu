/* eslint-disable spaced-comment */

// Import the GameOfLife class from its location
import GameOfLife from "./ts/GameOfLifeClass/GameOfLife";

// Initialize the game parameters
const dimensionSquareGrid = 30; // The grid size is 30x30
const initialPopulationRate = 0.15; // 15% of the grid will be populated initially
const numberGenerations = 10 ** 4; // The game will run for 10000 generations
const speedTransition = 600; // Time in milliseconds between each generation
const lifePattern = "🔵"; // Using a blue circle emoji to represent alive cells
const deathPattern = "⚫"; // Using a black circle emoji to represent dead cells

// Main function to start the Game of Life
const startGameOfLife = (): void => {
  let countTransitions = 1; // Counter to keep track of generations

  // Create a new GameOfLife object
  const game = new GameOfLife(dimensionSquareGrid, lifePattern, deathPattern);

  // Initialize the grid with dead cells and then populate it
  game.createDeadGrid();
  game.populateDeadGrid(initialPopulationRate);

  // Function to update and display the current state of the game
  const getGameOfLifeState = () => {
    const gameFormatted = game.displayState(); // Get the current state as a formatted string
    const gameContainer = document.querySelector(".game-container")!; // Select the HTML container where the game is displayed

    // Update the HTML container with the current game state after a time delay
    setTimeout(() => {
      gameContainer.innerHTML = gameFormatted;
    }, countTransitions * speedTransition); // If we replace speedTransition with a function, we may obtain non-linear time.

    // Move to the next generation of the game
    game.changeStateGrid();
  };

  // Run the game for a specified number of generations
  for (let generation = 0; generation <= numberGenerations; generation++) {
    getGameOfLifeState();
    countTransitions++; // Increment the counter for the next generation
  }
};

// Start the game
startGameOfLife();

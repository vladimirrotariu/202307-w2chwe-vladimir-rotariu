class GameOfLife {
  dimensionSquareGrid;

  constructor(dimensionSquareGrid) {
    this.dimensionSquareGrid = dimensionSquareGrid;
  }

  createDeadGrid() {
    const grid = [];

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      grid.push([]);
    }

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        grid[row][cell] = "🍂";
      }
    }

    this.currentState = grid;
  }

  populateDeadGrid(initialPopulationRate) {
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        if (Math.random() <= initialPopulationRate)
          this.currentState[row][cell] = "🍃";
      }
    }
  }
}

export default GameOfLife;

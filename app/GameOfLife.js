class GameOfLife {
  dimensionSquareGrid;

  constructor(dimensionSquareGrid) {
    this.dimensionSquareGrid = dimensionSquareGrid;
  }

  populateDeadGrid(initialPopulationRate) {
    this.#createDeadGrid();
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        if (Math.random() <= initialPopulationRate)
          this.currentState[row][cell] = "⚫";
      }
    }
  }

  displayState() {
    let statePositioned = "";
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      statePositioned += this.currentState[row].join(" ") + "<br/>";
    }

    return statePositioned;
  }

  #createDeadGrid() {
    const grid = [];

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      grid.push([]);
    }

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        grid[row][cell] = "🔴";
      }
    }

    this.currentState = grid;
  }
}

export default GameOfLife;

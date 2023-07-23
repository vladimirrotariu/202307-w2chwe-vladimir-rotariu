class GameOfLife {
  dimensionSquareGrid;
  lifePattern;
  deathPattern;

  constructor(dimensionSquareGrid, lifePattern, deathPattern) {
    this.dimensionSquareGrid = dimensionSquareGrid;
    this.lifePattern = lifePattern;
    this.deathPattern = deathPattern;
  }

  createDeadGrid() {
    const grid = [];

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      grid.push([]);
    }

    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        grid[row][cell] = this.lifePattern;
      }
    }

    this.currentGridState = grid;
  }

  populateDeadGrid(initialPopulationRate) {
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        if (Math.random() <= initialPopulationRate)
          this.currentGridState[row][cell] = this.deathPattern;
      }
    }
  }

  displayState() {
    let statePositioned = "";
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      statePositioned += this.currentGridState[row].join("") + "<br/>";
    }

    return statePositioned;
  }

  changeStateGrid() {
    const oldGridState = this.currentGridState;
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        this.#changeStateCell(row, cell, oldGridState);
      }
    }
  }

  #changeStateCell(row, cell, oldGridState) {
    const neighbours = [];
    switch (true) {
      case row === 0 && cell === 0:
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row + 1][cell + 1]);
        neighbours.push(oldGridState[row + 1][cell]);

        this.#changeStateCornerCell(neighbours, oldGridState, row, cell);

        break;
      case row === 0 && cell === this.dimensionSquareGrid - 1:
        neighbours.push(oldGridState[row][cell - 1]);
        neighbours.push(oldGridState[row + 1][cell - 1]);
        neighbours.push(oldGridState[row + 1][cell]);

        this.#changeStateCornerCell(neighbours, oldGridState, row, cell);

        break;
      case row === this.dimensionSquareGrid - 1 && cell === 0:
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell]);
        neighbours.push(oldGridState[row - 1][cell - 1]);

        this.#changeStateCornerCell(neighbours, oldGridState, row, cell);

        break;
      case row === this.dimensionSquareGrid - 1 &&
        cell === this.dimensionSquareGrid - 1:
        neighbours.push(oldGridState[row - 1][cell]);
        neighbours.push(oldGridState[row - 1][cell - 1]);
        neighbours.push(oldGridState[row][cell - 1]);

        this.#changeStateCornerCell(neighbours, oldGridState, row, cell);

        break;
      case row === 0:
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row + 1][cell + 1]);
        neighbours.push(oldGridState[row + 1][cell]);
        neighbours.push(oldGridState[row + 1][cell - 1]);
        neighbours.push(oldGridState[row][cell - 1]);

        this.#changeStateMarginCell(neighbours, oldGridState, row, cell);

        break;
      case cell === 0:
        neighbours.push(oldGridState[row + 1][cell]);
        neighbours.push(oldGridState[row + 1][cell + 1]);
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell]);

        this.#changeStateMarginCell(neighbours, oldGridState, row, cell);

        break;
      case row === this.dimensionSquareGrid - 1:
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell]);
        neighbours.push(oldGridState[row - 1][cell - 1]);
        neighbours.push(oldGridState[row][cell - 1]);

        this.#changeStateMarginCell(neighbours, oldGridState, row, cell);

        break;
      case cell === this.dimensionSquareGrid - 1:
        neighbours.push(oldGridState[row + 1][cell]);
        neighbours.push(oldGridState[row + 1][cell - 1]);
        neighbours.push(oldGridState[row][cell - 1]);
        neighbours.push(oldGridState[row - 1][cell - 1]);
        neighbours.push(oldGridState[row - 1][cell]);

        this.#changeStateMarginCell(neighbours, oldGridState, row, cell);

        break;
      default:
        neighbours.push(oldGridState[row + 1][cell]);
        neighbours.push(oldGridState[row + 1][cell + 1]);
        neighbours.push(oldGridState[row][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell + 1]);
        neighbours.push(oldGridState[row - 1][cell]);
        neighbours.push(oldGridState[row - 1][cell - 1]);
        neighbours.push(oldGridState[row][cell - 1]);
        neighbours.push(oldGridState[row + 1][cell - 1]);

        this.#changeStateMiddleCell(neighbours, oldGridState, row, cell);

        break;
    }
  }

  #changeStateCornerCell(neighbours, oldGridState, row, cell) {
    const deathCount = this.#countDeathNeighbours(neighbours);

    if (oldGridState[row][cell] === this.deathPattern && deathCount === 0) {
      this.currentGridState[row][cell] = this.lifePattern;
      return;
    }

    if (oldGridState[row][cell] === this.lifePattern && deathCount >= 2) {
      this.currentGridState[row][cell] = this.deathPattern;
      return;
    }

    this.currentGridState[row][cell] = oldGridState[row][cell];
  }

  #changeStateMarginCell(neighbours, oldGridState, row, cell) {
    const deathCount = this.#countDeathNeighbours(neighbours);

    if (oldGridState[row][cell] === this.deathPattern && deathCount === 2) {
      this.currentGridState[row][cell] = this.lifePattern;
      return;
    }

    if (oldGridState[row][cell] === this.lifePattern && deathCount <= 1) {
      this.currentGridState[row][cell] = this.deathPattern;
      return;
    }

    if (oldGridState[row][cell] === this.lifePattern && deathCount >= 4) {
      this.currentGridState[row][cell] = this.deathPattern;
      return;
    }

    this.currentGridState[row][cell] = oldGridState[row][cell];
  }

  #changeStateMiddleCell(neighbours, oldGridState, row, cell) {
    const deathCount = this.#countDeathNeighbours(neighbours);

    if (oldGridState[row][cell] === this.deathPattern && deathCount === 5) {
      this.currentGridState[row][cell] = this.lifePattern;
      return;
    }

    if (oldGridState[row][cell] === this.lifePattern && deathCount <= 4) {
      this.currentGridState[row][cell] = this.deathPattern;
      return;
    }

    if (oldGridState[row][cell] === this.lifePattern && deathCount >= 7) {
      this.currentGridState[row][cell] = this.deathPattern;
      return;
    }

    this.currentGridState[row][cell] = oldGridState[row][cell];
  }

  #countDeathNeighbours(neighbours) {
    let deathCount = 0;
    neighbours.forEach((neighbour) => {
      if (neighbour === this.deathPattern) deathCount++;
    });
    return deathCount;
  }
}

export default GameOfLife;

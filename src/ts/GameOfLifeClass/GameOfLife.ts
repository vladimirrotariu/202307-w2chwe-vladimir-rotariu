class GameOfLife {
  private currentGridState = [[""]]; // Holds the current state of the grid

  constructor(
    private readonly dimensionSquareGrid: number, // Dimensions of the grid
    private readonly lifePattern: string, // Representation of a living cell
    private readonly deathPattern: string, // Representation of a dead cell
  ) {}

  // Initializes a dead grid
  createDeadGrid(): void {
    const grid = [[""]];

    // Initialize the grid
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      grid.push([]);
    }

    grid.shift();

    // Populate grid with 'dead' cells
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        grid[row].push(this.lifePattern);
      }
    }

    this.currentGridState = grid;
  }

  // Populates the grid based on an initial population rate
  populateDeadGrid(initialPopulationRate: number): void {
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        if (Math.random() <= initialPopulationRate)
          this.currentGridState[row][cell] = this.deathPattern;
      }
    }
  }

  // Returns the current state of the grid as a string
  displayState(): string {
    let statePositioned = "";
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      statePositioned += this.currentGridState[row].join("") + "<br/>";
    }

    return statePositioned;
  }

  // Iterates through the grid and updates each cell's state
  changeStateGrid(): void {
    const oldGridState = this.currentGridState;
    for (let row = 0; row < this.dimensionSquareGrid; row++) {
      for (let cell = 0; cell < this.dimensionSquareGrid; cell++) {
        this.#changeStateCell(row, cell, oldGridState);
      }
    }
  }

  // Internal: Updates the state of a corner cell
  #changeStateCell(row: number, cell: number, oldGridState: string[][]): void {
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

  // Internal: Updates the state of a corner cell
  #changeStateCornerCell(
    neighbours: string[],
    oldGridState: string[][],
    row: number,
    cell: number,
  ): void {
    const deathCount = this.#countDeadNeighbours(neighbours);

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

  #changeStateMarginCell(
    neighbours: string[],
    oldGridState: string[][],
    row: number,
    cell: number,
  ): void {
    const deathCount = this.#countDeadNeighbours(neighbours);

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

  // Internal: Updates the state of a middle cell
  #changeStateMiddleCell(
    neighbours: string[],
    oldGridState: string[][],
    row: number,
    cell: number,
  ): void {
    const deathCount = this.#countDeadNeighbours(neighbours);

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

  // Internal: Counts the number of dead neighbors for a given cell
  #countDeadNeighbours(neighbours: string[]): number {
    let deathCount = 0;
    neighbours.forEach((neighbour) => {
      if (neighbour === this.deathPattern) deathCount++;
    });
    return deathCount;
  }
}

export default GameOfLife;

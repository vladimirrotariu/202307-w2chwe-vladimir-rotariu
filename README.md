<div>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white&labelColor=3178C6" alt="TypeScript" />
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white&labelColor=E34F26" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white&labelColor=1572B6" alt="CSS3" />
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white&labelColor=F05032" alt="Git" />
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white&labelColor=2088FF" alt="GitHub Actions" />
</div>

# Conway's  Game of Life

## Description

We present an OOP implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Although one might find more concise implementations of Conway's Game of Life, we designed ours respecting Unix philosophy principles: see the [Implementation](#implementation) section.

## Play

Conway's Game of Life is a notorious [zero-player game](https://en.wikipedia.org/wiki/Zero-player_game), so all that you have to do to play is to:
* [CLICK HERE!](https://conways-game-of-life-reimplemented.netlify.app/)

## Tech stack:
* Web: TypeScript, HTML5, CSS3.
* CI/CD: GitHubActions.
* OOP/SOLID principles.

## Implementation
The parameters of a 'game' instance of the ```GameOfLife``` class:
```
// Initialize the game parameters

// The grid size is 30x30
const dimensionSquareGrid = 30;

// 15% of the grid will be populated initially
const initialPopulationRate = 0.15; 

// The game will run for 10000 generations
const numberGenerations = 10 ** 4;

// Time in milliseconds between each generation
const speedTransition = 600; 

// Using a blue circle emoji to represent alive cells
const lifePattern = "🔵"; 

// Using a black circle emoji to represent dead cells
const deathPattern = "⚫"; 
```
Only the high-level parameters (i.e. grid dimension and styles) are properties of the class:
```
constructor(
    private readonly dimensionSquareGrid: number, 
    private readonly lifePattern: string, 
    private readonly deathPattern: string, 
  ) {}
```
The methods are simple in nature and do a single thing, obeying the UNIX philosophy/KISS principle:
```
#countDeadNeighbours(neighbours: string[]): number {
    let deathCount = 0;
    neighbours.forEach((neighbour) => {
      if (neighbour === this.deathPattern) deathCount++;
    });
    return deathCount;
  }
```

## Scripts

`npm run dev`: starts a development server for the Game of Life

`npm run build`: builds the Game of Life app

`npm run preview`: runs the Game of Life built app

`npm run lint`: runs ESLint

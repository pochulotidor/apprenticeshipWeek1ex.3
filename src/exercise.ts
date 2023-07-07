//Don Pochulo Tidor
//Week 1 exercise 3

/*
Game Of Life

any live cell with fewer than 2 live neighbors dies, by underpopulation

any live cell with two or three live neighbors lives, to the next generation

any live cell with more than three live neighbors dies, by overpopulation

any dead cell with exactly 3 live neighbors becomes a live cell, buy reproduction

100 x 100 grid

1st gen
X X X 
O X O
O O O

2nd gen 
X X X 
X X X 
O O O

3rd gen 
X O X 
X O X 
O O O
*/

class Generation {
  public grid: string[][]

  constructor() {
    this.grid = this.setInitial()
  }

  setInitial(): string[][] {
    const grid: string[][] = []
    const symbol = ['X', 'O']

    for (let i = 0; i < 3; i++) {
      const row: string[] = []
      for (let j = 0; j < 3; j++) {
        const randomValue = Math.floor(Math.random() * symbol.length)
        const value = symbol[randomValue]
        row.push(value)
      }
      grid.push(row)
    }

    return grid

  }

  aliveNeighbor(row: number, col: number): number {
    let aliveCount: number = 0;
    const rows = this.grid.length
    const cols = this.grid.length

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        //checks wether the cureent cell evaluated, is not included as its neighbor
        if (i === row && j === col) {
          continue
        }

        const valid = i >= 0 && i < rows && j >= 0 && j < cols
        if (valid && this.grid[i][j] === 'X') {
          aliveCount++
        }
      }
    }

    return aliveCount


  }

  nextGen(): string[][] {
    const row = this.grid.length
    const col = this.grid.length
    const nextGen: string[][] = []

    for (let i = 0; i < row; i++) {
      const newRow: string[] = []

      for (let j = 0; j < col; j++) {
        const liveNeighbor = this.aliveNeighbor(i, j)

        if (this.grid[i][j] === 'X') {
          if (liveNeighbor < 2 || liveNeighbor > 3) {
            newRow.push('O')
          } else {
            newRow.push('X')
          }
        } else {
          if (liveNeighbor === 3) {
            newRow.push('X')
          } else {
            newRow.push('O')
          }
        }

      }
      nextGen.push(newRow)
    }
    return nextGen
  }

  simulate(): void {

    let count = 1;
    let resume = true;

    while (resume) {
      console.log(`Generation ${count}`);
      this.printGen();

      this.grid = this.nextGen();
      count++;

      // Check if all cells are dead
      const allDead = this.grid.every(row => row.every(cell => cell === 'O'));
      if (allDead) {
        console.log('Generation dies: All cells are dead.');
        this.printGen();
        resume = false;
      }
    }

  }

  printGen(): void {

    for (let row of this.grid) {
      console.log(`| ${row.join(' | ')} | `)
      console.log('-----------')
    }

  }
}

const gen = new Generation()
gen.simulate()

/*
private check(): void {

  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid.length; j++) {
      if (this.grid[i][j] === 'X') {
        continueGen = false
      }else{

      }
    }
  }

}*/
/*
let count = 1
  let resume = true

  while (resume) {
    console.log(`Generation ${count}`);
    this.printGen();


    this.grid = this.nextGen();
    count++;

  }
  for(let i = 0; i < 10; i++){
    console.log(`Generation ${count}`);
    this.printGen();


    this.grid = this.nextGen();
    count++;
  }*/
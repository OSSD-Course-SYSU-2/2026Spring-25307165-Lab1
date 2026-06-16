// common/GomokuGame.ets
export class GomokuGame {
  private board: number[][] = [];
  private currentPlayer: number = 1;
  private gameOver: boolean = false;
  private winner: number = 0;
  readonly boardSize: number = 15;

  constructor() {
    this.initBoard();
  }

  initBoard() {
    this.board = Array(this.boardSize).fill(0).map(() => Array(this.boardSize).fill(0));
    this.currentPlayer = 1;
    this.gameOver = false;
    this.winner = 0;
  }

  placePiece(row: number, col: number): boolean {
    if (this.gameOver) return false;
    if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) return false;
    if (this.board[row][col] !== 0) return false;

    this.board[row][col] = this.currentPlayer;

    if (this.checkWin(row, col)) {
      this.gameOver = true;
      this.winner = this.currentPlayer;
      return true;
    }

    if (this.isDraw()) {
      this.gameOver = true;
      return true;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    return true;
  }

  private checkWin(row: number, col: number): boolean {
    const directions: number[][] = [[1, 0], [0, 1], [1, 1], [1, -1]];
    const player: number = this.board[row][col];

    for (let i = 0; i < directions.length; i++) {
      const dx: number = directions[i][0];
      const dy: number = directions[i][1];
      let count: number = 1;

      for (let step = 1; step <= 4; step++) {
        const newRow: number = row + dx * step;
        const newCol: number = col + dy * step;
        if (newRow < 0 || newRow >= this.boardSize || newCol < 0 || newCol >= this.boardSize) break;
        if (this.board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      for (let step = 1; step <= 4; step++) {
        const newRow: number = row - dx * step;
        const newCol: number = col - dy * step;
        if (newRow < 0 || newRow >= this.boardSize || newCol < 0 || newCol >= this.boardSize) break;
        if (this.board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) return true;
    }
    return false;
  }

  private isDraw(): boolean {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] === 0) return false;
      }
    }
    return true;
  }

  reset() {
    this.initBoard();
  }

  getBoard(): number[][] {
    return this.board;
  }

  getCurrentPlayer(): number {
    return this.currentPlayer;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getWinner(): number {
    return this.winner;
  }

  getGameState(): string {
    const stateObj = {
      board: this.board,
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner
    };
    return JSON.stringify(stateObj);
  }

  restoreGameState(stateStr: string) {
    const state: Record<string, Object> = JSON.parse(stateStr);
    this.board = state.board as number[][];
    this.currentPlayer = state.currentPlayer as number;
    this.gameOver = state.gameOver as boolean;
    this.winner = state.winner as number;
  }

  restoreFromState(state: {
    board: number[][];
    currentPlayer: number;
    gameOver: boolean;
    winner: number;
  }) {
    this.board = state.board;
    this.currentPlayer = state.currentPlayer;
    this.gameOver = state.gameOver;
    this.winner = state.winner;
  }
}
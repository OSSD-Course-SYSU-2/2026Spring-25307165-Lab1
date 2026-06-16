<<<<<<< HEAD
// pages/Index.ets
@Entry
@Component
struct Index {
  @State board: number[][] = [];
  @State currentPlayer: number = 1;
  @State gameOver: boolean = false;
  @State statusText: string = "黑棋回合";
  private cellSize: number = 35;

  aboutToAppear() {
    this.initBoard();
  }

  initBoard() {
    this.board = Array(15).fill(0).map(() => Array(15).fill(0));
    this.currentPlayer = 1;
    this.gameOver = false;
    this.statusText = "黑棋回合";
  }

  checkWin(row: number, col: number): boolean {
    const player = this.board[row][col];
    // 四个方向：水平、垂直、主对角线、副对角线
    const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let i = 0; i < dirs.length; i++) {
      const dx = dirs[i][0];
      const dy = dirs[i][1];
      let count = 1;

      // 正方向延伸
      for (let step = 1; step <= 4; step++) {
        const newRow = row + dx * step;
        const newCol = col + dy * step;
        if (newRow < 0 || newRow >= 15 || newCol < 0 || newCol >= 15) break;
        if (this.board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      // 反方向延伸
      for (let step = 1; step <= 4; step++) {
        const newRow = row - dx * step;
        const newCol = col - dy * step;
        if (newRow < 0 || newRow >= 15 || newCol < 0 || newCol >= 15) break;
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

  placePiece(row: number, col: number) {
    if (this.gameOver) return;
    if (this.board[row][col] !== 0) return;

    this.board[row][col] = this.currentPlayer;

    if (this.checkWin(row, col)) {
      this.gameOver = true;
      this.statusText = this.currentPlayer === 1 ? "黑棋胜利！" : "白棋胜利！";
      return;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.statusText = this.currentPlayer === 1 ? "黑棋回合" : "白棋回合";
  }

  resetGame() {
    this.initBoard();
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text("五子棋")
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .margin({ left: 20 })

        Blank()

        Button("新游戏")
          .onClick(() => this.resetGame())
          .margin({ right: 20 })
          .backgroundColor(0x007DFF)
      }
      .width('100%')
      .height(60)
      .backgroundColor(0xF1F3F5)

      // 状态栏
      Text(this.statusText)
        .fontSize(18)
        .margin({ top: 20, bottom: 10 })

      // 棋盘
      Scroll() {
        Column() {
          ForEach(this.board, (row: number[], rowIndex: number) => {
            Row() {
              ForEach(row, (cell: number, colIndex: number) => {
                Stack() {
                  // 棋盘背景
                  Column()
                    .width(this.cellSize)
                    .height(this.cellSize)
                    .backgroundColor(0xF5DEB3)
                    .border({ width: 0.5, color: 0x8B7355 })

                  // 棋子
                  if (cell === 1) {
                    Circle({ width: this.cellSize - 8, height: this.cellSize - 8 })
                      .fill(0x000000)
                  } else if (cell === 2) {
                    Circle({ width: this.cellSize - 8, height: this.cellSize - 8 })
                      .fill(0xFFFFFF)
                      .stroke(0x333333)
                      .strokeWidth(1)
                  }
                }
                .width(this.cellSize)
                .height(this.cellSize)
                .onClick(() => this.placePiece(rowIndex, colIndex))
              })
            }
          })
        }
      }
      .width('100%')
      .height(this.cellSize * 15 + 50)
    }
    .width('100%')
    .height('100%')
    .backgroundColor(0xFFFFFF)
=======
import router from '@ohos.router'

@Entry
@Component
struct Index {
  build() {
    Column() {
      Button('开始打地鼠游戏')
        .width(200)
        .height(60)
        .fontSize(20)
        .margin({ top: 200 })
        .onClick(() => {
          // 这种写法最原始，IDE 挑不出毛病
          router.pushUrl({ url: 'pages/GamePage' });
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
>>>>>>> 9e6216c3319450af190960906cddf24e7f8c2d40
  }
}
import router from '@ohos.router'

@Entry
@Component
struct GamePage {
  @State score: number = 0
  @State timeLeft: number = 30
  @State holes: number[] = [0, 0, 0, 0, 0]

  private timer: number = -1
  private moleTimer: number = -1

  aboutToAppear() {
    this.startGame()
  }

  startGame() {
    this.score = 0
    this.timeLeft = 30
    this.holes = [0, 0, 0, 0, 0]

    this.timer = setInterval(() => {
      this.timeLeft--
      if (this.timeLeft <= 0) {
        this.endGame()
      }
    }, 1000)

    this.moleTimer = setInterval(() => {
      this.holes = this.holes.map(() => 0)
      const i = Math.floor(Math.random() * 5)
      this.holes[i] = 1
    }, 900)
  }

  endGame() {
    clearInterval(this.timer)
    clearInterval(this.moleTimer)

    // ✅ 关键：游戏结束，带着分数跳转到结果页
    router.pushUrl({
      url: 'pages/ResultPage',
      params: { score: this.score }
    })
  }

  hit(index: number) {
    if (this.holes[index] === 1) {
      this.score++
      this.holes[index] = 0
    }
  }

  build() {
    Column({ space: 20 }) {
      Text(`⏱ 时间：${this.timeLeft}s`)
        .fontSize(24)
        .fontColor(Color.White)

      Text(`🎯 分数：${this.score}`)
        .fontSize(26)
        .fontColor(Color.White)

      Grid() {
        ForEach(this.holes, (v: number, i: number) => {
          GridItem() {
            Stack() {
              Circle()
                .width('80%')
                .aspectRatio(1)
                .fill(Color.Brown)

              if (v === 1) {
                Text('🐹')
                  .fontSize(36)
              }
            }
            .onClick(() => this.hit(i))
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr')
      .rowsTemplate('1fr 1fr')
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#4CAF50')
  }
}
// Index.ets - 优化版打地鼠游戏（草地背景+圆形地鼠洞+点击缩放动画）
@Entry
@Component
struct WhackAMole {
  // 游戏状态：未开始/进行中/结束
  @State gameState: 'idle' | 'playing' | 'end' = 'idle';
  // 分数
  @State score: number = 0;
  // 剩余时间（秒）
  @State timeLeft: number = 30;
  // 地鼠洞状态：0=隐藏，1=出现
  @State holes: number[] = [0, 0, 0, 0, 0];
  // 地鼠被点击时的缩放状态（用于动画）
  @State hitScale: number[] = [1, 1, 1, 1, 1];
  // 定时器句柄
  private gameTimer: number | null = null;
  private moleTimer: number | null = null;

  // 开始游戏
  startGame() {
    this.gameState = 'playing';
    this.score = 0;
    this.timeLeft = 30;
    this.holes = [0, 0, 0, 0, 0];
    this.hitScale = [1, 1, 1, 1, 1];

    // 倒计时
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    // 随机冒出地鼠
    this.moleTimer = setInterval(() => {
      // 先隐藏所有地鼠
      this.holes = this.holes.map(() => 0);
      // 随机选1个洞让地鼠出现
      const randomIndex = Math.floor(Math.random() * 5);
      this.holes[randomIndex] = 1;
    }, 800);
  }

  // 结束游戏
  endGame() {
    this.gameState = 'end';
    if (this.gameTimer) clearInterval(this.gameTimer);
    if (this.moleTimer) clearInterval(this.moleTimer);
    this.holes = [0, 0, 0, 0, 0];
  }

  // 点击地鼠洞（带动画）
  hitHole(index: number) {
    if (this.gameState !== 'playing') return;
    if (this.holes[index] === 1) {
      // 打到地鼠，得分+1，隐藏地鼠
      this.score += 1;
      this.holes[index] = 0;

      // 点击缩放动画
      animateTo({ duration: 100 }, () => {
        this.hitScale[index] = 0.8;
      });
      animateTo({ duration: 100, delay: 100 }, () => {
        this.hitScale[index] = 1;
      });
    }
  }

  build() {
    Column({ space: 15 }) {
      // 标题栏：分数 + 时间
      Row({ space: 30 }) {
        Text(`分数：${this.score}`)
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Text(`剩余时间：${this.timeLeft}s`)
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.timeLeft <= 10 ? Color.Red : Color.White)
      }
      .margin({ top: 20 })

      // 游戏状态提示
      if (this.gameState === 'idle') {
        Text('点击下方按钮开始游戏！')
          .fontSize(20)
          .fontColor(Color.White)
      } else if (this.gameState === 'end') {
        Text(`游戏结束！你的最终得分是：${this.score}`)
          .fontSize(22)
          .fontColor(Color.Orange)
          .fontWeight(FontWeight.Bold)
      }

      // 地鼠洞区域：5个洞围成圆形
      Stack() {
        // 地鼠洞1（顶部）
        Stack() {
          Rect()
            .width(60)
            .height(60)
            .fill(Color.Brown)
            .borderRadius(30)
          if (this.holes[0] === 1) {
            Text('🐹')
              .fontSize(40)
              .scale({ x: this.hitScale[0], y: this.hitScale[0] })
          }
        }
        .width(60)
        .height(60)
        .onClick(() => this.hitHole(0))
        .position({ x: '50%', y: '10%' })
        .translate({ x: -30, y: 0 })

        // 地鼠洞2（右上）
        Stack() {
          Rect()
            .width(60)
            .height(60)
            .fill(Color.Brown)
            .borderRadius(30)
          if (this.holes[1] === 1) {
            Text('🐹')
              .fontSize(40)
              .scale({ x: this.hitScale[1], y: this.hitScale[1] })
          }
        }
        .width(60)
        .height(60)
        .onClick(() => this.hitHole(1))
        .position({ x: '80%', y: '35%' })
        .translate({ x: -30, y: 0 })

        // 地鼠洞3（右下）
        Stack() {
          Rect()
            .width(60)
            .height(60)
            .fill(Color.Brown)
            .borderRadius(30)
          if (this.holes[2] === 1) {
            Text('🐹')
              .fontSize(40)
              .scale({ x: this.hitScale[2], y: this.hitScale[2] })
          }
        }
        .width(60)
        .height(60)
        .onClick(() => this.hitHole(2))
        .position({ x: '70%', y: '70%' })
        .translate({ x: -30, y: 0 })

        // 地鼠洞4（左下）
        Stack() {
          Rect()
            .width(60)
            .height(60)
            .fill(Color.Brown)
            .borderRadius(30)
          if (this.holes[3] === 1) {
            Text('🐹')
              .fontSize(40)
              .scale({ x: this.hitScale[3], y: this.hitScale[3] })
          }
        }
        .width(60)
        .height(60)
        .onClick(() => this.hitHole(3))
        .position({ x: '30%', y: '70%' })
        .translate({ x: -30, y: 0 })

        // 地鼠洞5（左上）
        Stack() {
          Rect()
            .width(60)
            .height(60)
            .fill(Color.Brown)
            .borderRadius(30)
          if (this.holes[4] === 1) {
            Text('🐹')
              .fontSize(40)
              .scale({ x: this.hitScale[4], y: this.hitScale[4] })
          }
        }
        .width(60)
        .height(60)
        .onClick(() => this.hitHole(4))
        .position({ x: '20%', y: '35%' })
        .translate({ x: -30, y: 0 })
      }
      .width('100%')
      .layoutWeight(1)
      .margin({ top: 10, bottom: 10 })

      // 控制按钮
      Button(this.gameState === 'playing' ? '游戏中...' : '开始游戏')
        .width(150)
        .height(45)
        .fontSize(18)
        .backgroundColor(this.gameState === 'playing' ? Color.Gray : Color.Blue)
        .onClick(() => {
          if (this.gameState !== 'playing') {
            this.startGame();
          }
        })
        .margin({ bottom: 20 })
    }
    .width('100%')
    .height('100%')
    // 草地背景（用渐变模拟，不用图片也能实现效果）
    .linearGradient({
      direction: GradientDirection.Bottom,
      colors: [['#4CAF50', 0.0], ['#2E7D32', 1.0]]
    })
  }
}
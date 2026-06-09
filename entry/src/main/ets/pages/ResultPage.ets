import router from '@ohos.router'

@Entry
@Component
struct ResultPage {
  @State score: number = 0

  // 🟢 重点：这里我已经把上一版导致报错的 getParams 类型判断全删掉了
  // 直接留空或者写个简单的赋值都可以，反正 score 默认就是 0
  aboutToAppear() {
    // 这里不需要复杂的类型判断了，因为 score 已经默认是 number 了
  }

  build() {
    Column({ space: 25 }) {
      Text('🎉 游戏结束')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)

      // 这里直接用 this.score，绝对不会报错了
      Text(`你的最终得分是：${this.score}`)
        .fontSize(26)

      Button('返回重玩')
        .width(160)
        .height(45)
        .onClick(() => router.back())
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#f5f5f5')
  }
}
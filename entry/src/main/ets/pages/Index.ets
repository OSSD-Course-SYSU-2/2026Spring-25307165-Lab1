@Entry
@Component
struct Index {
  @State showMotto: boolean = false

  build() {
    Stack() {
      Column() {
        // 名片卡片
        Column({ space: 15 }) {
          // 头像
          Circle()
            .width(90)
            .height(90)
            .fill('#eef5ff')
            .border({ width: 4, color: '#3366FF' })

          Text("王文全")
            .fontSize(28)
            .fontWeight(FontWeight.Bold)

          Text("电子信息工程专业 | 8班")
            .fontSize(16)
            .fontColor('#666666')

          Text("学号：25307165")
            .fontSize(14)
            .fontColor('#777777')

          Text("爱好：写代码 | 看书 | 音乐")
            .fontSize(14)
            .fontColor('#888888')

          // 按钮
          Button("查看我的座右铭")
            .width(180)
            .height(42)
            .backgroundColor('#3366FF')
            .fontColor(Color.White)
            .borderRadius(20)
            .onClick(() => {
              this.showMotto = !this.showMotto
            })
            .margin({ top: 10 })

          // 点击后显示
          if (this.showMotto) {
            Text("星光不问赶路人，时光不负有心人")
              .fontSize(15)
              .fontColor('#3366FF')
              .fontStyle(FontStyle.Italic)
          }
        }
        .width('85%')
        .padding(30)
        .backgroundColor(Color.White)
        .borderRadius(24)
        .shadow({ radius: 12, color: '#00000015', offsetX: 0, offsetY: 5 })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
      .margin({ top: 70 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f0f7ff')
  }
}
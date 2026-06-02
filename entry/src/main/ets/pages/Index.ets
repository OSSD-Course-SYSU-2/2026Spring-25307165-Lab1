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
  }
}
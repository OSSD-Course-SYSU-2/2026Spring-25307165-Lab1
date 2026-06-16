import { TodoItem } from '../../model/TodoItem';
import { TodoDataManager } from '../../mock/TodoDataManager';
import { DateUtils, FormatUtil, ThemeController } from '@ohos_agcit/daily_schedule_common_lib';
import { leftSwipeButtonBuilder } from '../builder/LeftSwipeButtonBuilder';
import { CustomIcon } from '@ohos_agcit/daily_schedule_component_lib';
import { PriorityEnum } from '../../enum/TodoItemEnum';
import { UpdateTodoPlanTimeInfo } from '../../mock/UpdateTodoInfo';
import { curves } from '@kit.ArkUI';
import { ConfigurationConstant } from '@kit.AbilityKit';
import { editTodoTaskBuilder } from '../builder/EditTodoTaskBuilder';
import { SheetCallbacks } from '../../types/Types';
import {common } from '@kit.AbilityKit';
import { calendarManager } from '@kit.CalendarKit';
import { BusinessError } from '@kit.BasicServicesKit';

let calendarMgr: calendarManager.CalendarManager | null = null;
let mContext: common.UIAbilityContext | null = null;
@ComponentV2
export struct TodoSection {
  dataManager: TodoDataManager = TodoDataManager.instance
  updateTodoInfo: UpdateTodoPlanTimeInfo = UpdateTodoPlanTimeInfo.instance
  themeController: ThemeController = ThemeController.instance;
  controller: Scroller = new Scroller()
  @Param label: string | Resource = '今天'
  @Param todoItems: TodoItem[] = this.dataManager.loadMockTodos()
  @Param onDelete: (taskID: string) => void = () => {
  }
  @Param onModify: (taskID: string) => void = () => {
  }
  @Local isExpand: boolean = true
  @Local isShowEditSheet: boolean = false
  @Provider('title') title: string = '';
  @Provider('selectedTime') selectedTime: Date = new Date()
  @Provider('repetitionType') repetitionType: number = 0
  @Provider('repetitionMultiType') repetitionMultiType: number[] = [];
  @Provider('reminderType') reminderType: number = 0
  @Provider('priorityType') priorityType: number = 0
  @Local currentItem: TodoItem = new TodoItem('', '', new Date(), 0, 0, 0, false)

  build() {
    Column() {
      Row() {
        Text(this.label).fontColor($r('sys.color.font_secondary')).fontSize($r('sys.float.Body_L'))
        Blank()
        Text(this.todoItems.length.toString())
          .fontColor($r('app.color.color_gray_deeper'))
          .fontSize($r('sys.float.Body_L'))
        Image(this.isExpand ? $r('app.media.path_up') : $r('app.media.path_down'))
          .height(15)
          .width(15)
          .margin({ left: '2.5%' })
          .onClick(() => {
            this.isExpand = !this.isExpand
          })
      }
      .height(60)
      .width('100%')

      if (this.isExpand) {
        List({ scroller: this.controller, space: 15 }) {
          ForEach(this.todoItems, (item: TodoItem, index: number) => {
            ListItem() {
              Row() {
                Column() {
                  Checkbox()
                    .select(item.isFinished)
                    .unselectedColor(this.chooseCheckBoxColor(item))
                    .selectedColor($r('sys.color.icon_tertiary'))
                    .shape(CheckBoxShape.ROUNDED_SQUARE)
                    .mark({
                      strokeColor: $r('sys.color.comp_background_primary_contrary'),
                    })
                    .onChange((value: boolean) => {
                      this.dataManager.updateTaskFinish(item.taskID, value)
                    })
                    .margin({ top: 11 })
                }
                .height('100%')
                .justifyContent(FlexAlign.Start)

                Column() {
                  Text(item.title.length > 16 ? item.title.substring(0, 16) + '...' : item.title)
                    .fontWeight(FontWeight.Regular)
                    .fontSize($r('sys.float.Body_L'))
                    .fontColor(this.chooseTitleColor(item))
                    .maxLines(1)
                  Blank().height(12)
                  Text(FormatUtil.formatDate(item.planTime, FormatUtil.DATE_YYYY_MM_DD_24H_mm))
                    .fontWeight(FontWeight.Regular)
                    .fontSize($r('sys.float.Body_M'))
                    .fontColor(this.choosePlainTimeColor(item))
                }
                .margin({ left: 6, top: 12 })
                .alignItems(HorizontalAlign.Start)
              }
              .padding({ left: 14, right: 14 })
              .height(76)
              .width('100%')
              .backgroundColor(this.themeController.currentColorMode ===
              ConfigurationConstant.ColorMode.COLOR_MODE_DARK ? $r('sys.color.background_tertiary') :
              $r('sys.color.background_primary'))
              .borderRadius(16)
              .justifyContent(FlexAlign.Start)
              .alignItems(VerticalAlign.Top)
              .onClick(() => {
                this.title=item.title;
                this.selectedTime=item.planTime;
                this.repetitionType=item.repetitionType;
                this.reminderType=item.reminderType;
                this.priorityType=item.priorityType;
                this.repetitionMultiType=item.repetitionMultiType;
                this.isShowEditSheet =  !this.isShowEditSheet;
              })
              .bindSheet($$this.isShowEditSheet, editTodoTaskBuilder({
                onConfirm: () => {
                  let calendar: calendarManager.Calendar;
                  try {
                    console.info('权限请求成功');
                    calendarMgr = calendarManager.getCalendarManager(mContext);
                    console.info('CalendarManager 初始化成功');
                    calendarMgr?.getCalendar().then((data: calendarManager.Calendar) => {
                      calendar=data
                      console.info(`Succeeded in getting calendar, data -> ${JSON.stringify(data)}`);
                      // Index.ets
                      const updateEvent: calendarManager.Event = {
                        title: this.title,
                        description: 'updateEventTest',
                        type: calendarManager.EventType.NORMAL,
                        id: Number(item.taskID),
                        startTime:  this.selectedTime.getTime(),
                        endTime:  this.selectedTime.getTime() + 60 * 60 * 1000
                      };
                      calendar.updateEvent(updateEvent).then(() => {
                        console.info(`Succeeded in updating event`);
                      }).catch((err: BusinessError) => {
                        console.error(`Failed to update event. Code: ${err.code}, message: ${err.message}`);
                      });
                    }).catch((err: BusinessError) => {
                      console.error(`Failed to get calendar. Code: ${err.code}, message: ${err.message}`);
                    });
                  } catch (error) {
                    console.error('初始化失败:', error);
                  }
                  this.dataManager.updateTask(new TodoItem(item.taskID, this.title, this.selectedTime, this.repetitionType, this.reminderType,
                    this.priorityType, false));
                  this.isShowEditSheet =  !this.isShowEditSheet;
                },
                onClose: () => {
                  this.isShowEditSheet =  !this.isShowEditSheet;
                }
              }), {
                height: SheetSize.LARGE,
                preferType: SheetType.BOTTOM,
                showClose: false
              })
            }
            .transition(TransitionEffect.OPACITY
              .combine(TransitionEffect.translate({ x: 0, y: 100 }))
              .animation({ curve: curves.springMotion(), delay: 30 * index }))
            .swipeAction({
              end: {
                builder: leftSwipeButtonBuilder(() => {
                  this.onDelete(item.taskID)
                }, () => {
                  this.onModify(item.taskID)
                })
              }
            })
          }, (item: string, index: number) => JSON.stringify(item))
        }
        .margin({ bottom: '5%' })
        .width('100%')
      }
    }
    .height(this.calcHeight())
    .animation({
      curve: Curve.Linear,
      duration: 300
    })
    .width('100%')
    .backgroundColor($r('sys.color.background_secondary'))
    .padding({ left: '5%', right: '5%' })
  }

  private chooseTitleColor(item: TodoItem): ResourceColor {
    if (item.isFinished) {
      return $r('sys.color.font_tertiary')
    }
    return $r('sys.color.icon_primary');
  }

  private choosePlainTimeColor(item: TodoItem): ResourceColor {
    if (item.isFinished) {
      return $r('sys.color.font_tertiary')
    }
    return DateUtils.isExpiredDate(item.planTime) ? $r('sys.color.warning') :
    $r('sys.color.icon_primary');
  }

  private chooseCheckBoxColor(item: TodoItem): ResourceColor {
    if (item.priorityType === PriorityEnum.LOW) {
      return $r('sys.color.multi_color_04')
    }
    if (item.priorityType === PriorityEnum.MID) {
      return $r('sys.color.alert')
    }
    if (item.priorityType === PriorityEnum.HIGH) {
      return $r('sys.color.warning')
    }
    return $r('sys.color.font_tertiary')
  }

  private calcHeight(): Length {
    if (!this.isExpand || this.todoItems.length === 0) {
      return 60
    }
    return 60 + this.todoItems.length * 80 + (this.todoItems.length - 1) * 15 + 15;
  }

  @Builder
  itemEnd(index: number) {
    Row() {
      CustomIcon({
        resource: $r('sys.symbol.calendar_fill'),
        backgroundColor: $r('sys.color.multi_color_02'),
        onClick: () => {

        }
      })
      CustomIcon({
        resource: $r('sys.symbol.trash'),
        backgroundColor: $r('sys.color.warning'),
        onClick: () => {

        }
      })
    }
  }
}
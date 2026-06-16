import { TodoItem } from '../model/TodoItem';
import { addTodoTaskBuilder } from './builder/AddTodoTaskBuilder';
import { TodoDataManager } from '../mock/TodoDataManager';
import { ExtInfo, FilterInfo, TodoListTabInfo } from '../mock/TitleDataManager';
import { TodoTitleBar } from './components/TodoTitleBar';
import { UpdateTodoPlanTimeInfo } from '../mock/UpdateTodoInfo';
import { TodoSectionList } from './components/TodoSectionList';
import { StatusFilterEnum } from '../enum/FilterEnum';
import { AvoidArea } from '@ohos_agcit/daily_schedule_component_lib';
import { AppStorageV2 } from '@kit.ArkUI';
import { calendarManager } from '@kit.CalendarKit';
import { BusinessError } from '@kit.BasicServicesKit';
import {common } from '@kit.AbilityKit';

let calendarMgr: calendarManager.CalendarManager | null = null;
let mContext: common.UIAbilityContext | null = null;

@ComponentV2
export struct TodoPage {
  dataManager: TodoDataManager = TodoDataManager.instance
  statusManager: FilterInfo = FilterInfo.instance
  updateTodoInfo: UpdateTodoPlanTimeInfo = UpdateTodoPlanTimeInfo.instance
  todoListTabInfo: TodoListTabInfo = TodoListTabInfo.instance
  extInfo: ExtInfo = ExtInfo.instance
  @Local avoidArea: AvoidArea = AppStorageV2.connect(AvoidArea, () => new AvoidArea(0, 0))!;
  @Local isShowAddTodoSheet: boolean = false;
  @Local deleteTaskID: string = '';
  @Provider('title') title: string = '';
  @Provider('selectedTime') selectedTime: Date = new Date()
  @Provider('repetitionType') repetitionType: number = 0
  @Provider('repetitionMultiType') repetitionMultiType: number[] = [];
  @Provider('reminderType') reminderType: number = 0
  @Provider('priorityType') priorityType: number = 0
  @Local eventId : number | undefined = undefined;
  aboutToAppear(): void {
    this.restore()
  }

  save() {
    const event: calendarManager.Event = {

      title: this.title,

      type: calendarManager.EventType.NORMAL,
      // 日程开始时间
      startTime: this.selectedTime.getTime(),
      // 日程结束时间
      endTime: this.selectedTime.getTime() + 60 * 60 * 1000,
      // 距开始时间提前10分钟提醒
      reminderTime: [10],
      // 日程重复规则，可选属性。如果日程为周期性日程需要填写该属性。
      recurrenceRule: {
        // 日程重复规则类型，支持按天、按周、按月、按年重复
        recurrenceFrequency: calendarManager.RecurrenceFrequency.DAILY,
        // 日程重复次数，该字段和expire属性只需要填写一个，如果两个都填写按照count属性计算。
        count: 100,
        // 重复日程间隔时间，与recurrenceFrequency相关，此示例表示日程每隔2天进行重复。
        interval: 2,
        // 日程过期时间，该字段和count属性只需要填写一个，如果两个都填写按照count属性计算。
        expire:  this.selectedTime.getTime() + 60 * 60 * 1000 * 3,
        // 日程排除日期，将该日期从重复日程中排除掉
        excludedDates: [ this.selectedTime.getTime() + 60 * 60 * 1000 * 2]
      }
    };
    let calendar: calendarManager.Calendar;
    try {
      console.info('权限请求成功');
      calendarMgr = calendarManager.getCalendarManager(mContext);
      console.info('CalendarManager 初始化成功');
      calendarMgr?.getCalendar().then((data: calendarManager.Calendar) => {
        calendar=data
        console.info(`Succeeded in getting calendar, data -> ${JSON.stringify(data)}`);
        calendar.addEvent(event).then((data: number) => {
          console.info(`Succeeded in adding event, id -> ${data}`);
          this.eventId = data;
        }).catch((err: BusinessError) => {
          console.error(`Failed to addEvent. Code: ${err.code}, message: ${err.message}`);
        });
      }).catch((err: BusinessError) => {
        console.error(`Failed to get calendar. Code: ${err.code}, message: ${err.message}`);
      });
    } catch (error) {
      console.error('初始化失败:', error);
    }
    this.dataManager.addTask(new TodoItem(String(this.eventId), this.title, this.selectedTime, this.repetitionType, this.reminderType,
      this.priorityType, false))
    this.restore()
  }

  restore() {
    this.title = ''
    this.selectedTime = new Date()
    this.repetitionType = 0
    this.reminderType = 0
    this.priorityType = 0
  }

  build() {
    Column() {
      TodoTitleBar({
        onSort: () => {
          this.extInfo.isDescending = !this.extInfo.isDescending
          this.dataManager.sortTask(this.extInfo.isDescending)
        },
        onImport: async ()=>{
          const newTasks= await this.dataManager.importTasks()
          if (newTasks.length > 0) {
            newTasks.forEach(task => {
              const event: calendarManager.Event = {

                title: task.title,

                type: calendarManager.EventType.NORMAL,
                // 日程开始时间
                startTime: task.planTime.getTime(),
                // 日程结束时间
                endTime: task.planTime.getTime() + 60 * 60 * 1000,
                // 距开始时间提前10分钟提醒
                reminderTime: [10],
                // 日程重复规则，可选属性。如果日程为周期性日程需要填写该属性。
                recurrenceRule: {
                  // 日程重复规则类型，支持按天、按周、按月、按年重复
                  recurrenceFrequency: calendarManager.RecurrenceFrequency.DAILY,
                  // 日程重复次数，该字段和expire属性只需要填写一个，如果两个都填写按照count属性计算。
                  count: 100,
                  // 重复日程间隔时间，与recurrenceFrequency相关，此示例表示日程每隔2天进行重复。
                  interval: 2,
                  // 日程过期时间，该字段和count属性只需要填写一个，如果两个都填写按照count属性计算。
                  expire:  task.planTime.getTime() + 60 * 60 * 1000 * 3,
                  // 日程排除日期，将该日期从重复日程中排除掉
                  excludedDates: [ task.planTime.getTime() + 60 * 60 * 1000 * 2]
                }
              };
              let calendar: calendarManager.Calendar;
              try {
                console.info('权限请求成功');
                calendarMgr = calendarManager.getCalendarManager(mContext);
                console.info('CalendarManager 初始化成功');
                calendarMgr?.getCalendar().then((data: calendarManager.Calendar) => {
                  calendar=data
                  console.info(`Succeeded in getting calendar, data -> ${JSON.stringify(data)}`);
                  calendar.addEvent(event).then((data: number) => {
                    console.info(`Succeeded in adding event, id -> ${data}`);
                    this.eventId = data;
                  }).catch((err: BusinessError) => {
                    console.error(`Failed to addEvent. Code: ${err.code}, message: ${err.message}`);
                  });
                }).catch((err: BusinessError) => {
                  console.error(`Failed to get calendar. Code: ${err.code}, message: ${err.message}`);
                });
              } catch (error) {
                console.error('初始化失败:', error);
              }
              this.dataManager.addTask(new TodoItem(String(this.eventId), task.title, task.planTime, task.repetitionType, task.reminderType,
                task.priorityType, false))
              this.restore()
            });
            console.info('TodoDataManager: Processed imported tasks successfully.');
          };
        },
        onExport: ()=>{
          this.dataManager.exportTasks()
        }
      })
        .align(Alignment.Center)

      Stack() {
        if (this.dataManager.allTasks.length !== 0) {
          TodoSectionList({
            params: [
              {
                label: $r('app.string.todo_section_today'),
                data: this.dataManager.todayTasks,
                isShow:
                [StatusFilterEnum.ALL].indexOf(this.todoListTabInfo.statusIndex) !== -1
              },
              {
                label: $r('app.string.todo_section_tomorrow'),
                data: this.dataManager.tomorrowTasks,
                isShow:
                [StatusFilterEnum.ALL].indexOf(this.todoListTabInfo.statusIndex) !== -1
              },
              {
                label: $r('app.string.todo_section_all'),
                data: this.dataManager.allNotCompleteTasks,
                isShow:
                [StatusFilterEnum.ALL].indexOf(this.todoListTabInfo.statusIndex) !== -1
              },
              {
                label: $r('app.string.todo_section_complete'),
                data: this.dataManager.finishedTasks,
                isShow: this.extInfo.isShowFinished &&
                  [StatusFilterEnum.ALL, StatusFilterEnum.FINISHED].indexOf(this.todoListTabInfo.statusIndex) !== -1
              },
              {
                label: $r('app.string.todo_section_expire'),
                data: this.dataManager.expiredTasks,
                isShow:
                [StatusFilterEnum.ALL, StatusFilterEnum.EXPIRED].indexOf(this.todoListTabInfo.statusIndex) !== -1
              }
            ]
          })
        } else {
          Column() {
            Column() {
              Image($r('app.media.todo_bg'))
                .width(100)
                .height(150)
              Text('暂无日程，请开始添加吧～').fontWeight(FontWeight.Normal).fontColor($r('sys.color.font_tertiary'))
            }
          }
          .justifyContent(FlexAlign.Center)
          .height('60%')
          .width('100%')
        }


        Image($r('app.media.icon_add'))
          .height(44)
          .width(44)
          .onClick(() => {
            this.isShowAddTodoSheet = !this.isShowAddTodoSheet
          })
          .zIndex(2)
          .position({ x: '80%', y: '85%' })
          .bindSheet($$this.isShowAddTodoSheet, addTodoTaskBuilder({
            onConfirm: () => {
              if (this.title === '') {
                this.getUIContext().getPromptAction().showToast({
                  message: '内容不能为空',
                  alignment: Alignment.Bottom
                })
                return
              }
              this.save()
              this.isShowAddTodoSheet = !this.isShowAddTodoSheet;
            },
            onClose: () => {
              this.isShowAddTodoSheet = !this.isShowAddTodoSheet;
            }
          }), {
            height: SheetSize.LARGE,
            preferType: SheetType.BOTTOM,
            showClose: false
          })
      }
      .align(Alignment.TopStart)
      .height('90%')
      .width('100%')
    }
    .height('100%')
    .width('100%')
    .padding({ top: px2vp(this.avoidArea.topRectHeight) + 10 })
    .backgroundColor($r('sys.color.background_secondary'))
  }
}



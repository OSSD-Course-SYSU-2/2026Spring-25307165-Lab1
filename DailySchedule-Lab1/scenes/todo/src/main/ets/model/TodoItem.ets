@ObservedV2
export class TodoItem {
  @Trace taskID: string;
  @Trace title: string;
  @Trace planTime: Date;
  @Trace repetitionType: number;
  @Trace reminderType: number;
  @Trace priorityType: number;
  @Trace isFinished: boolean;
  @Trace repetitionMultiType: number[] = [];

  constructor(taskID: string, title: string, planTime: Date, repetitionType: number, reminderType: number,
    priority: number, isFinished: boolean, repetitionMultiType: number[] = []) {
    this.taskID = taskID;
    this.title = title;
    this.planTime = planTime;
    this.repetitionType = repetitionType;
    this.reminderType = reminderType;
    this.priorityType = priority;
    this.isFinished = isFinished;
    this.repetitionMultiType = repetitionMultiType;
  }
}
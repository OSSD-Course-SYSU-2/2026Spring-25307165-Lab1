import { TodoItem } from '../model/TodoItem';
import { PriorityEnum } from '../../../../Index';
import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import util from '@ohos.util';

export class ICalUtils {

  public static async exportTasks(tasks: TodoItem[]): Promise<void> {
    try {
      const icsContent = ICalUtils.generateICSContent(tasks);
      const textEncoder = new util.TextEncoder();
      const contentArray = textEncoder.encodeInto(icsContent);

      const documentPicker = new picker.DocumentViewPicker();
      const documentSaveOptions = new picker.DocumentSaveOptions();
      documentSaveOptions.newFileNames = ["Schedule.ics"];
      const uris = await documentPicker.save(documentSaveOptions);

      if (uris && uris.length > 0) {
        const file = fs.openSync(uris[0], fs.OpenMode.WRITE_ONLY | fs.OpenMode.CREATE);
        fs.writeSync(file.fd, contentArray.buffer);
        fs.closeSync(file);
        console.info('ICalUtils: Tasks exported successfully.');
      }
    } catch (err) {
      console.error('ICalUtils: Failed to export tasks:', err);
    }
  }

  public static async importTasks(): Promise<TodoItem[]> {
    try {
      const documentPicker = new picker.DocumentViewPicker();
      const documentSelectOptions = new picker.DocumentSelectOptions();
      const uris = await documentPicker.select(documentSelectOptions);

      if (uris && uris.length > 0) {
        const file = fs.openSync(uris[0], fs.OpenMode.READ_ONLY);
        const buffer = new ArrayBuffer(4096);
        fs.readSync(file.fd, buffer);
        fs.closeSync(file);

        const textDecoder = new util.TextDecoder('utf-8');
        const icsContent = textDecoder.decodeWithStream(new Uint8Array(buffer));
        const newTasks = ICalUtils.parseICSContent(icsContent);

        console.info('ICalUtils: Tasks imported successfully.');
        return newTasks;
      }
    } catch (err) {
      console.error('ICalUtils: Failed to import tasks:', err);
    }
    return []; // 发生错误或未选择文件时返回空数组
  }

  private static generateICSContent(tasks: TodoItem[]): string {
    const icsString = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//YourApp//EN',
    ];

    tasks.forEach(task => {
      const endDate = new Date(task.planTime.getTime() + (60 * 60 * 1000));
      icsString.push(
        'BEGIN:VEVENT',
        `UID:${task.taskID}@yourapp.com`,
        `DTSTAMP:${ICalUtils.toICSDate(new Date())}`,
        `DTSTART:${ICalUtils.toICSDate(task.planTime)}`,
        `DTEND:${ICalUtils.toICSDate(endDate)}`,
        `SUMMARY:${task.title}`,
        'END:VEVENT'
      );
    });

    icsString.push('END:VCALENDAR');
    return icsString.join('\r\n');
  }

  private static parseICSContent(icsContent: string): TodoItem[] {
    const lines = icsContent.split(/\r\n|\n|\r/);
    const newTasks: TodoItem[] = [];
    let currentTaskData: Partial<TodoItem> = Object({});

    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        currentTaskData = Object({

          isFinished: false,
          repetitionType: 0,
          reminderType: 0,
          priorityType: PriorityEnum.NO,
        });
      } else if (line.startsWith('END:VEVENT')) {
        if (currentTaskData.title && currentTaskData.planTime) {

          newTasks.push(new TodoItem(
            '',
            currentTaskData.title,
            currentTaskData.planTime,
            currentTaskData.repetitionType!,
            currentTaskData.reminderType!,
            currentTaskData.priorityType!,
            currentTaskData.isFinished!
          ));
        }
      } else if (line.startsWith('SUMMARY:')) {
        currentTaskData.title = line.substring(8);
      } else if (line.startsWith('DTSTART:')) {
        currentTaskData.planTime = ICalUtils.fromICSDate(line.substring(8));
      }
    }
    return newTasks;
  }

  private static toICSDate(date: Date): string {
    const pad = (i: number) => (i < 10 ? '0' + i : '' + i);
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T` +
      `${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  }


  private static fromICSDate(icsDate: string): Date {
    const year = parseInt(icsDate.substring(0, 4), 10);
    const month = parseInt(icsDate.substring(4, 6), 10) - 1;
    const day = parseInt(icsDate.substring(6, 8), 10);
    const hour = parseInt(icsDate.substring(9, 11), 10);
    const minute = parseInt(icsDate.substring(11, 13), 10);
    const second = parseInt(icsDate.substring(13, 15), 10);
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
}
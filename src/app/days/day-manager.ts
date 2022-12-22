import { Injectable } from '@angular/core';
import { Day1 } from './day-1';
import { Day2 } from './day-2';
import { Day3 } from './day-3';
import { DayData } from './day-data.interface';
import { Day } from './day.class';

@Injectable({
  providedIn: 'root'
})
export class DayManager {
  [k: string]: any;

  constructor(
    private day1: Day1,
    private day2: Day2,
    private day3: Day3,
  ) {
  }

  isDayAvailable(day: number): boolean {
    return this.hasOwnProperty('day' + day)
  }

  async getDayData(day: number): Promise<DayData> {
    const d = this['day' + String(day)]
    if (d instanceof Day) {
      await d.prepareData()
      return {
        step1: d.step1(),
        step2: d.step2(),
      }
    }
    throw new Error(`DayManager.day${day} is not an instance of Day.`)
  }
}

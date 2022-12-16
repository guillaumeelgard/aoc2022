import { Pipe, PipeTransform } from '@angular/core';
import { DayManager } from './day-manager';

@Pipe({
  name: 'isDayAvailable'
})
export class IsDayAvailablePipe implements PipeTransform {

  constructor(
    private dayManager: DayManager,
  ) {
  }

  transform(n: number): boolean {
    return this.dayManager.isDayAvailable(n)
  }
}

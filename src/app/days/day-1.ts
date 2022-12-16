import { Injectable } from '@angular/core';
import { sum } from 'src/app/utils/calc.utils';
import { Day } from './day.class';

@Injectable({
  providedIn: 'root'
})
export class Day1 extends Day {
  override day = 1
  private calories!: number[]

  override async prepareData(): Promise<void> {
    await super.prepareData()
    this.calories = this.data.split('\n\n').map(elf => sum(elf.split('\n').map(Number)))
  }

  override step1(): string {
    return Math.max(...this.calories).toString()
  }

  override step2(): string {
    return sum(this.calories.sort((a, b) => a - b).slice(-3)).toString()
  }
}

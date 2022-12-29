import { Injectable } from '@angular/core'
import { Day } from './day.class'

type Assignment = {min: number, max: number}
function isAssignment(foo: unknown): foo is Assignment {
  return typeof foo === 'object'
    && foo !== null
    && 'min' in foo
    && 'max' in foo
    && typeof (foo as Assignment).min === 'number'
    && typeof (foo as Assignment).max === 'number'
    && (foo as Assignment).min <= (foo as Assignment).max;
}

type Pair = [Assignment, Assignment]
function isPair(foo: unknown): foo is Pair {
  return Array.isArray(foo)
    && foo.length === 2
    && foo.every(f => isAssignment(f))
}

@Injectable({
  providedIn: 'root'
})
export class Day4 extends Day {
  override day = 4
  private pairs!: Pair[]

  override async prepareData(): Promise<void> {
    await super.prepareData()
    this.pairs = this.data.trim().split('\n').map(line => {
        const pair = line.split(',').map(assignment => {
          const [min, max] = assignment.split('-').map(Number)
          return {min, max}
        })
        if (isPair(pair)) {
          return pair
        }
        throw new Error('bad pair format')
    })
  }

  override step1(): string {
    return this.pairs.filter(pair => {

      const firstAssignmentIncludesSecondAssignment = pair[0].min <= pair[1].min && pair[0].max >= pair[1].max
      const secondAssignmentIncludesFirstAssignment = pair[1].min <= pair[0].min && pair[1].max >= pair[0].max
      return firstAssignmentIncludesSecondAssignment || secondAssignmentIncludesFirstAssignment

    }).length.toString()
  }

  override step2(): string {
    return this.pairs.filter(pair => {

      const a = pair[0].min <= pair[1].min && pair[1].min <= pair[0].max
      const b = pair[0].min <= pair[1].max && pair[1].max <= pair[0].max
      const c = pair[1].min <= pair[0].min && pair[0].min <= pair[1].max
      const d = pair[1].min <= pair[0].max && pair[0].max <= pair[1].max
      return a || b || c || d

    }).length.toString()
  }
}

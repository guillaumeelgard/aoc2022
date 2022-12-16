import { Injectable } from '@angular/core';
import { sum } from '../utils/calc.utils';
import { Day } from './day.class';

type Shape = 'ROCK' | 'PAPER' | 'SCISSORS'
type MatchResult = 'LOSE' | 'DRAW' | 'WIN'
type OpponentShape = 'A' | 'B' | 'C'
type MyShape = 'X' | 'Y' | 'ZA'
type Match = {
  opponentShape: OpponentShape,
  myShape: MyShape,
}

const ShapeScore: { [key in Shape]: number } = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}
const MatchScore: { [key in MatchResult]: number } = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
}
const OpponentShapeTranslator: { [key in OpponentShape]: Shape } = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
}
const MyShapeTranslator: { [key in MyShape]: Shape } = {
  X: 'ROCK',
  Y: 'PAPER',
  ZA: 'SCISSORS',
}

@Injectable({
  providedIn: 'root'
})
export class Day2 extends Day {
  override day = 2
  private guide!: Match[]

  override async prepareData(): Promise<void> {
    await super.prepareData()
    this.guide = this.data.trim().split('\n').map(line => {
      const [opponentShape, myShape] = line.split(' ')
      const a = myShape as MyShape
      console.log(a)
      return { opponentShape, myShape } as Match
    })
  }

  override step1(): string {
    this.guide.map(match => {
    })
    // return sum(this.guide.map(match => MyShapesScores[ShapeScores[match.myShape]] + Day2.getMatchResult(match))).toString()
    return 'ok'
  }

  private static getMatchResult(match: Match): number {
    // switch (MyShapeScore[match.myShape] - OpponentShapeScore[match.opponentShape]) {
    //   case -2:
    //     return MatchResults.WIN
    //   case -1:
    //     return MatchResults.LOSE
    //   case -0:
    //     return MatchResults.DRAW
    //   case 1:
    //     return MatchResults.WIN
    //   case 2:
    //     return MatchResults.LOSE
    // }
    return 0

  }

  override step2(): string {
    return 'ok'
  }
}

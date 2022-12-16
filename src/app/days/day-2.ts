import { Injectable } from '@angular/core'
import { Day } from './day.class'
import { sum } from './../utils/calc.utils'

const Shapes = ['ROCK', 'PAPER', 'SCISSORS'] as const
type Shape = typeof Shapes[number]
function isShape(val: any): val is Shape {
  return Shapes.includes(val)
}

const MatchResults = ['LOSE', 'DRAW', 'WIN'] as const
type MatchResult = typeof MatchResults[number]
function isMatchResult(val: any): val is MatchResult {
  return MatchResults.includes(val)
}

const OpponentShapes = ['A', 'B', 'C'] as const
type OpponentShape = typeof OpponentShapes[number]
function isOpponentShape(val: any): val is OpponentShape {
  return OpponentShapes.includes(val)
}

const MyShapes = ['X', 'Y', 'Z'] as const
type MyShape = typeof MyShapes[number]
function isMyShape(val: any): val is MyShape {
  return MyShapes.includes(val)
}

type Match = {
  opponentShape: OpponentShape,
  myShape: MyShape,
}
function isMatch(val: any): val is Match {
  return isOpponentShape(val.opponentShape) && isMyShape(val.myShape)
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
  Z: 'SCISSORS',
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
      const match = { opponentShape, myShape }
      if (isMatch(match)) {
        return match
      }
      throw new Error('Bad match format')
    })
  }

  override step1(): string {
    return sum(this.guide.map(match => {
      return ShapeScore[MyShapeTranslator[match.myShape]] + MatchScore[Day2.getMatchResult(match)]
    })).toString()
  }

  private static getMatchResult(match: Match): MatchResult {
    switch (ShapeScore[MyShapeTranslator[match.myShape]] - ShapeScore[OpponentShapeTranslator[match.opponentShape]]) {
      case 1:
      case -2:
        return 'WIN'
      case 0:
        return 'DRAW'
      case 2:
      case -1:
        return 'LOSE'
    }
    throw new Error('Impossible')
  }

  override step2(): string {
    return 'ok'
  }
}

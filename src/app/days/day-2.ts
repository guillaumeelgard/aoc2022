import { Injectable } from '@angular/core'
import { Day } from './day.class'
import { sum } from './../utils/calc.utils'

const Shapes = ['ROCK', 'PAPER', 'SCISSORS'] as const
type Shape = typeof Shapes[number]
function isShape(shape: any): shape is Shape {
  return Shapes.includes(shape)
}

const MatchResults = ['LOSE', 'DRAW', 'WIN'] as const
type MatchResult = typeof MatchResults[number]
function isMatchResult(matchResult: any): matchResult is MatchResult {
  return MatchResults.includes(matchResult)
}

const Values1 = ['A', 'B', 'C'] as const
type Value1 = typeof Values1[number]
function isValue1(value1: any): value1 is Value1 {
  return Values1.includes(value1)
}

const Values2 = ['X', 'Y', 'Z'] as const
type Value2 = typeof Values2[number]
function isValue2(value2: any): value2 is Value2 {
  return Values2.includes(value2)
}

type Match = {
  val1: Value1,
  val2: Value2,
}
function isMatch(match: any): match is Match {
  return isValue1(match.val1) && isValue2(match.val2)
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
const Value1Translator: { [key in Value1]: Shape } = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
}
const Value2TranslatorStep1: { [key in Value2]: Shape } = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS',
}
const Value2TranslatorStep2: { [key in Value2]: MatchResult } = {
  X: 'LOSE',
  Y: 'DRAW',
  Z: 'WIN',
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
      const [val1, val2] = line.split(' ')
      const match = { val1, val2 }
      if (isMatch(match)) {
        return match
      }
      throw new Error('Bad match format')
    })
  }

  override step1(): string {
    return sum(this.guide.map(match => {
      const myShape = Value2TranslatorStep1[match.val2]
      const opponentShape = Value1Translator[match.val1]
      const myShapeScore = ShapeScore[myShape]
      const matchResult = Day2.getMatchResult(myShape, opponentShape)
      const matchScore = MatchScore[matchResult]
      return myShapeScore + matchScore
    })).toString()
  }

  private static getMatchResult(myShape: Shape, opponentShape: Shape): MatchResult {
    switch (ShapeScore[myShape] - ShapeScore[opponentShape]) {
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
    return sum(this.guide.map(match => {
      const matchResult = Value2TranslatorStep2[match.val2]
      const opponentShape = Value1Translator[match.val1]
      const matchScore = MatchScore[matchResult]
      const myShape = Day2.getMyShape(matchResult, opponentShape)
      const myShapeScore = ShapeScore[myShape]
      return myShapeScore + matchScore
    })).toString()
  }

  private static getMyShape(matchResult: MatchResult, opponentShape: Shape): Shape {
    switch (matchResult) {
      case 'DRAW':
        return opponentShape;
      case 'WIN':
        switch (opponentShape) {
          case 'PAPER':
            return 'SCISSORS'
          case 'SCISSORS':
            return 'ROCK'
          case 'ROCK':
            return 'PAPER'
        }
      case 'LOSE':
        switch (opponentShape) {
          case 'PAPER':
            return 'ROCK'
          case 'ROCK':
            return 'SCISSORS'
          case 'SCISSORS':
            return 'PAPER'
        }
    }
  }
}

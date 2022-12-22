import { Injectable } from '@angular/core'
import { sum } from '../utils/calc.utils'
import { Day } from './day.class'

type Supply = string
function isSupply(supply: any): supply is Supply {
    return typeof supply === 'string'
}

type Compartment = Supply[]
function isCompartment(compartment: any): compartment is Compartment {
  return Array.isArray(compartment) && compartment.every(supply => isSupply(supply))
}

type Rucksack = [Compartment, Compartment]
function isRucksack(rucksack: any): rucksack is Rucksack {
  return Array.isArray(rucksack)
    && rucksack.length === 2
    && rucksack.every(compartment => isCompartment(compartment))
    && rucksack[0].length === rucksack[1].length
}

@Injectable({
  providedIn: 'root'
})
export class Day3 extends Day {
  override day = 3
  private rucksacks!: Rucksack[]

  override async prepareData(): Promise<void> {
    await super.prepareData()
    this.rucksacks = this.data.trim().split('\n').map(line => {
        const rucksack = [
            Array.from(line.substring(0, line.length / 2)),
            Array.from(line.substring(line.length / 2)),
        ]
        if (isRucksack(rucksack)) {
          return rucksack
        }
        throw new Error('Bad rucksack format')
      }
    )
  }

  override step1(): string {
    return sum(this.rucksacks.map(rucksack => Day3.getScoreSupply(rucksack[0].find(supply => rucksack[1].includes(supply))!))).toString()
  }

  override step2(): string {
    let score = 0
    for (let i = 0; i < this.rucksacks.length / 3; i++) {
      const supplies = [
        this.rucksacks[i * 3],
        this.rucksacks[i * 3 + 1],
        this.rucksacks[i * 3 + 2],
      ].map(rucksack => [...rucksack[0], ...rucksack[1]])
      score+= Day3.getScoreSupply(supplies[0].find(supply => supplies[1].includes(supply) && supplies[2].includes(supply))!)
    }
    return score.toString()
  }

  private static getScoreSupply(supply: Supply): number {
    const minorSupply = supply.toLowerCase()
    let score = minorSupply.charCodeAt(0) - 96
    if (minorSupply !== supply) {
        score+= 26
    }
    return score
  }
}

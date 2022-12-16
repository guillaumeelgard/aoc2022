export abstract class Day {
  abstract day: number;
  abstract step1(): string
  abstract step2(): string
  private _data?: string

  public async prepareData(): Promise<void> {
    this._data = await fetch(`/assets/day${this.day}.txt`).then(r => r.text())
  }

  protected get data(): string {
    if (this._data === undefined) {
      throw new Error('Day.prepareData() has not be called')
    }
    return this._data
  }
}

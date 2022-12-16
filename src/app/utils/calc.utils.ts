export function sum(values: number[]): number {
  return values.reduce(
    (sum: number, value) => sum + value,
    0
  )
}
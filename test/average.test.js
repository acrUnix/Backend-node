import { average } from '../utils/forTesting'
describe('average', () => {
  test('of one value is the itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of much values is', () => {
    expect(average([1, 3, 4, 5, 6, 1, 1])).toBe(3)
  })

  test('of simil values is', () => {
    expect(average([2, 2, 2, 2, 2])).toBe(2)
  })
})

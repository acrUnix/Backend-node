import { palindrome } from '../utils/forTesting.js'

describe('palindrome testing', () => {
  test('palidrome de fullsatck', () => {
    const result = palindrome('fullstack')
    expect(result).toBe('kcatslluf')
  })

  test('palidrome de ciencia', () => {
    const result = palindrome('ciencia')
    expect(result).toBe('aicneic')
  })
  test('palidrome de cuantica', () => {
    const result = palindrome('cuantica')
    expect(result).toBe('acitnaud')
  })
  test('palidrome de strings', () => {
    const result = palindrome('strings')
    expect(result).toBe('sgnirts')
  })
})

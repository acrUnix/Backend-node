export const palindrome = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

export const average = array => {
  let sum = 0
  array.forEach(element => { sum += element })
  return sum / array.length
}

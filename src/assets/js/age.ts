function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getAge(start: Date) {
  const startDate = new Date(start)
  const endDate = new Date()
  let timeDifference = endDate.getTime() - startDate.getTime()

  let year = startDate.getFullYear()
  while (year <= endDate.getFullYear()) {
    if (isLeapYear(year)) timeDifference -= 24 * 60 * 60 * 1000
    year += 1
  }

  return Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 365)
}
export function parseCustomDate(dateString) {
  if (!dateString) return null

  try {
    const [datePart, timePart] = dateString.split(' ')
    const [day, month, year] = datePart.split('-')

    return new Date(`${year}-${month}-${day}T${timePart}`)
  } catch (error) {
    console.error('Error al convertir la fecha:', dateString, error)
    return null
  }
}

export const filterByTimeFrame = (data, timeFrame) => {
  if (!data.length) return []

  const latestDate = data[data.length - 1].parsedDate
  const startDate = new Date(latestDate)

  switch (timeFrame) {
    case '1D':
      startDate.setDate(startDate.getDate() - 1)
      break
    case '1S':
      startDate.setDate(startDate.getDate() - 7)
      break
    case '1M':
      startDate.setMonth(startDate.getMonth() - 1)
      break
    case '3M':
      startDate.setMonth(startDate.getMonth() - 3)
      break
    case '6M':
      startDate.setMonth(startDate.getMonth() - 6)
      break
    case '1A':
      startDate.setFullYear(startDate.getFullYear() - 1)
      break
    case '5A':
      startDate.setFullYear(startDate.getFullYear() - 5)
      break
    default:
      return data
  }

  return data.filter((item) => item.parsedDate >= startDate)
}

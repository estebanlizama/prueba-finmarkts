export const tendencyClassResult = (tend) => {
  return tend === 'down' ? 'negative' : tend === 'up' ? 'positive' : 'neutral'
}
export const tendencyIconResult = (tend) => {
  console.log('Tendencia:', tend)
  if (!tend) return 'mdi-minus'
  if (tend === 'down') return 'mdi-arrow-down-bold'
  if (tend === 'up') return 'mdi-arrow-up-bold'

  return 'mdi-minus'
}

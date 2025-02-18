import { filterByTimeFrame, parseCustomDate } from './dateUtils'

export const prepareChartData = (chartData, timeFrame) => {
  if (!chartData || chartData.length === 0) return null

  const sortedChart = [...chartData]
    .map((item) => ({
      ...item,
      parsedDate: parseCustomDate(item.datetimeLastPrice),
    }))
    .filter((item) => item.parsedDate !== null)
    .sort((a, b) => a.parsedDate - b.parsedDate)

  const filteredChart = filterByTimeFrame(sortedChart, timeFrame)

  return {
    labels: filteredChart.map((item) =>
      item.parsedDate.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    ),
    datasets: [
      {
        label: 'Evolución del Índice',
        data: filteredChart.map((item) => item.lastPrice),
        fill: true,
        borderColor: '#003d80',
        backgroundColor: 'rgba(0, 61, 128, 0.3)',
        tension: 0.1,
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
  }
}

export const getChartOptions = (chartData) => {
  if (!chartData || chartData.labels.length === 0) return {}

  const minValue = Math.min(...chartData.datasets[0].data) * 0.95
  const maxValue = Math.max(...chartData.datasets[0].data) * 1.05

  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        display: false,
        title: { display: false, text: 'Fecha', color: '#fff' },
        grid: { display: false },
      },
      y: {
        display: true,
        title: { display: false, text: 'Valor', color: '#fff' },
        suggestedMin: isFinite(minValue) ? minValue : 0,
        suggestedMax: isFinite(maxValue) ? maxValue : 100,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  }
}

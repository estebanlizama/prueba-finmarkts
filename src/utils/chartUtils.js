import { filterByTimeFrame, parseCustomDate } from './dateUtils'

export const prepareChartData = (chartData, timeFrame, customRange = null) => {
  if (!chartData || chartData.length === 0) return null

  const sortedChart = [...chartData]
    .map((item) => ({
      ...item,
      parsedDate: parseCustomDate(item.datetimeLastPrice),
    }))
    .filter((item) => item.parsedDate !== null)
    .sort((a, b) => a.parsedDate - b.parsedDate)

  const filteredChart = customRange
    ? filterByDateRange(sortedChart, customRange)
    : filterByTimeFrame(sortedChart, timeFrame)

  if (filteredChart.length === 0) {
    return {
      labels: ['Sin datos'],
      datasets: [
        {
          label: 'Evolución del Índice',
          data: [0],
          borderColor: 'rgba(255, 0, 0, 0.5)',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        },
      ],
    }
  }

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
        backgroundColor: (context) => {
          const { chart } = context
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(0, 61, 128, 0.3)'
          return createGradient(ctx, chartArea)
        },
        tension: 0.1,
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
  }
}
const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
  gradient.addColorStop(0, 'rgba(0, 61, 128, 0.7)')
  gradient.addColorStop(1, 'rgba(0, 61, 128, 0)')
  return gradient
}
export const filterByDateRange = (data, range) => {
  if (!range || !range.start) return data

  const startDate = new Date(range.start)
  const latestDate = data.length ? data[data.length - 1].parsedDate : new Date()

  const filteredData = data.filter(
    (item) => item.parsedDate >= startDate && item.parsedDate <= latestDate,
  )

  if (filteredData.length === 0) {
    return []
  }

  return filteredData
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

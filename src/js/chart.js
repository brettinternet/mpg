import Chart from 'chart.js'
import { canvas } from './templates'
import { labels, colors, ids } from './utils'
import findIndex from 'lodash/findIndex'

const renderCanvas = ({ rootId, ariaLabel, canvasId }) => {
  const div = document.createElement('div')
  div.innerHTML = canvas({
    ariaLabel,
    id: canvasId,
  })
  document.getElementById(rootId).appendChild(div)
}

export default ({ rootId, table }) => {
  const ariaLabel = 'charting miles and price per gallon over time'
  const canvasId = 'mpg'

  renderCanvas({ rootId, ariaLabel, canvasId })
  const ctx = document.getElementById(canvasId)

  new Chart(ctx, {
    type: 'line',
    data: getData(table.slice(1)),
    options: getOptions(),
  })
}

function getData(table) {
  return {
    maintainAspectRation: true,
    aspectRatio: 10,
    datasets: [
      {
        label: labels.PRICE,
        data: table.reduce((acc, val, index) => {
          if (index > 0) {
            const [date, mileage, gallons, price] = val
            acc.push({ x: new Date(date), y: price / gallons })
            return acc
          }
          return acc
        }, []),
        backgroundColor: Chart.helpers
          .color(colors.green)
          .alpha(0.5)
          .rgbString(),
        borderColor: colors.green,
        borderWidth: 1,
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        yAxisID: ids.PRICE_ID,
      },
      {
        label: labels.MPG,
        data: table.reduce((acc, val, index, arr) => {
          if (index > 0) {
            const [date, mileage, gallons, price] = val
            const prevMileage = arr[index - 1][1]
            const miles = mileage - prevMileage
            acc.push({ x: new Date(date), y: miles / gallons })
            return acc
          }
          return acc
        }, []),
        backgroundColor: Chart.helpers
          .color(colors.red)
          .alpha(0.5)
          .rgbString(),
        borderColor: colors.red,
        borderWidth: 1,
        type: 'line',
        pointRadius: 0,
        fill: 'start',
        lineTension: 0,
        borderWidth: 2,
        yAxisID: ids.MPG_ID,
      },
      {
        label: labels.MILEAGE,
        data: table.reduce((acc, val, index, arr) => {
          if (index > 0) {
            const [date, mileage, gallons, price] = val
            acc.push({ x: new Date(date), y: mileage })
            return acc
          }
          return acc
        }, []),
        backgroundColor: Chart.helpers
          .color(colors.blue)
          .alpha(0.5)
          .rgbString(),
        borderColor: colors.blue,
        borderWidth: 1,
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        yAxisID: ids.MILEAGE_ID,
      },
    ],
  }
}

function getOptions() {
  return {
    scales: {
      xAxes: [
        {
          type: 'time',
          scaleLabel: {
            display: true,
            labelString: 'date',
          },
          ticks: {
            major: {
              fontStyle: 'bold',
              fontcolor: '#FF0000',
            },
          },
        },
      ],
      yAxes: [
        {
          id: ids.MPG_ID,
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'mpg',
          },
          gridLines: {
            display: false,
          },
        },
        {
          id: ids.PRICE_ID,
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'price/gallon',
          },
          ticks: {
            callback: function(value, index, values) {
              return '$' + value
            },
          },
          gridLines: {
            display: false,
          },
        },
        {
          id: ids.MILEAGE_ID,
          type: 'linear',
          display: false,
        },
      ],
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      callbacks: {
        label: function(tooltipItem, myData) {
          var label = myData.datasets[tooltipItem.datasetIndex].label || ''
          if (label) {
            label += ': '
          }

          const priceIndex = findIndex(myData.datasets, { label: labels.PRICE })
          const mileageIndex = findIndex(myData.datasets, {
            label: labels.MILEAGE,
          })

          if (tooltipItem.datasetIndex === priceIndex) {
            label += '$'
          }

          if (tooltipItem.datasetIndex === mileageIndex) {
            label += tooltipItem.value
          } else {
            label += parseFloat(tooltipItem.value).toFixed(2)
          }

          return label
        },
      },
    },
  }
}

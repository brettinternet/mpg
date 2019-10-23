import Chart from 'chart.js'
import get from 'lodash/get'

const chartColors = {
  red: 'rgb(255, 99, 132)',
}

export default fields => {
  const ctx = document.getElementById('mpg-time').getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: shapeData(fields.slice(1)),
    options: getOptions(),
  })
}

function shapeData(fields) {
  const data = fields.reduce((acc, val, index, arr) => {
    if (index > 0) {
      const [date, mileage, gallons, price] = val
      const prevMileage = arr[index - 1][1]
      const miles = mileage - prevMileage
      acc.push({ x: new Date(date), y: miles / gallons })
      return acc
    }
    return acc
  }, [])

  return {
    maintainAspectRation: true,
    aspectRatio: 10,
    datasets: [
      {
        label: 'mpg',
        data,
        backgroundColor: Chart.helpers
          .color(chartColors.red)
          .alpha(0.5)
          .rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        type: 'line',
        pointRadius: 0,
        fill: 'start',
        lineTension: 0,
        borderWidth: 2,
      },
    ],
  }
}

function getOptions() {
  return {
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          display: true,
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
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'mpg',
          },
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
          label += parseFloat(tooltipItem.value).toFixed(2)
          return label
        },
      },
    },
  }
}

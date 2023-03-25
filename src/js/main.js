import fetch from 'unfetch'
import mpgGraph from './chart'
import { isEmpty } from './utils'

export default (csv) => {
  fetch(csv).then(deserialize).then(parse).then(setup).catch(console.error)
}

function deserialize(res) {
  return res.text()
}

function parse(str) {
  return str.split('\n').map((line) => line.split(','))
}

function setup(table) {
  mpgGraph({ rootId: 'charts', table })
  displayData(table)
}

function displayData(table) {
  const tableBody = table.slice(1)

  const priceEl = document.getElementById('price')
  priceEl.innerText = `$${calculateSum(table, 'price')}`

  const gallonsEl = document.getElementById('gallons')
  gallonsEl.innerText = `${calculateSum(table, 'gallons')} gallons`

  const fillupsEl = document.getElementById('fillups')
  fillupsEl.innerText = `${tableBody.length} fill-ups`

  const distanceEl = document.getElementById('distance')
  distanceEl.innerText = `${calculateDistance(table)} miles`
}

function calculateSum(table, columnId) {
  const header = table[0].map((v) => v.trim())
  const column = header.indexOf(columnId)
  const sum = table.slice(1).reduce((acc, val, index) => {
    if (!isEmpty(val[column])) {
      const value = Number(val[column])
      if (!isNaN(value)) {
        return acc + value
      } else {
        console.error(
          `Unable to sum bad value in column '${header[column]}' with value '${
            val[column]
          }' on line ${index + 2}`
        )
      }
    }
    return acc
  }, 0)
  const roundedValue = parseFloat(Math.round(sum * 100) / 100).toFixed(2)
  return numberWithCommas(roundedValue)
}

function calculateDistance(table) {
  const header = table[0]
  const column = header.indexOf('mileage')
  const tableBody = table.slice(1)
  let lastValue = tableBody[tableBody.length - 1][column]
  let i = 1
  while (isEmpty(lastValue) && i < 2) {
    i++
    lastValue = tableBody[tableBody.length - i][column]
  }
  if (isNaN(lastValue)) {
    console.error('Unable to calculate mileage distance')
    return 0
  }
  const firstValue = tableBody[0][column]
  const mostRecentMileage = Number(lastValue)
  const firstMileage = Number(firstValue)
  return numberWithCommas(mostRecentMileage - firstMileage)
}

/**
 * @source https://stackoverflow.com/a/2901298/6817437
 */
function numberWithCommas(x) {
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

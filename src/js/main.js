import fetch from 'unfetch'
import mpgGraph from './chart'

export default csv => {
  fetch(csv)
    .then(deserialize)
    .then(parse)
    .then(setup)
    .catch(console.error)
}

function deserialize(res) {
  return res.text()
}

function parse(str) {
  return str.split('\n').map(line => line.split(','))
}

function setup(table) {
  mpgGraph({ rootId: 'charts', table })
  displayData(table)
}

function displayData(table) {
  const elementSumPrice = document.getElementById('sum-price')
  elementSumPrice.innerText = `$${calculateSum(table, 'price')} total`

  const elementSumGallons = document.getElementById('sum-gallons')
  elementSumGallons.innerText = `${calculateSum(
    table,
    'gallons'
  )} total gallons`
}

function calculateSum(table, columnId) {
  const header = table[0]
  const column = header.indexOf(columnId)
  const sum = table.slice(1).reduce((acc, val) => {
    return acc + Number(val[column])
  }, 0)
  return parseFloat(Math.round(sum * 100) / 100).toFixed(2)
}

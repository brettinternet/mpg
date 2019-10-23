import main from './js/main'
import './main.css'

import fetch from 'unfetch'
import data from '../mpg.csv'

fetch(data)
  .then(getData)
  .then(parseCsv)
  .then(main)
  .catch(console.error)

function getData(res) {
  return res.text()
}

function parseCsv(str) {
  return str.split('\n').map(line => line.split(','))
}

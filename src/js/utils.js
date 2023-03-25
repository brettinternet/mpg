export const colors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}

export const ids = {
  MPG_ID: 'mpg',
  PRICE_ID: 'price',
  MILEAGE_ID: 'mileage',
}

export const labels = {
  MPG: 'mpg',
  PRICE: 'price/gallon',
  MILEAGE: 'mileage',
}

export function isEmpty(arg) {
  return typeof arg === 'undefined' || arg === null || arg === ''
}

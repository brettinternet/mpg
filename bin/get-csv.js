const request = require('request')
const fs = require('fs')
const path = require('path')
const logger = require('./logger')('get-csv.js')

const rootRepoDir = path.join(__dirname, '..')

require('dotenv').config({ path: path.join(rootRepoDir, '.env') })
const csvUrl = process.env.CSV_URL

const writeFile = (data) => {
  try {
    fs.writeFileSync(path.join(rootRepoDir, 'mpg.csv'), data, 'utf8')
    logger.info('mpg.csv file written')
  } catch (err) {
    logger.error(err)
  }
}

const main = () => {
  request(csvUrl, (err, res, body) => {
    if (err) logger.error(err)
    if (res && res.statusCode === 200) {
      logger.debug('mpg.csv file found')
      writeFile(body)
    } else {
      logger.warn(`${ res.statusCode } returned from mpg.csv URL (${ csvUrl })`)
    }
  })
}

main()
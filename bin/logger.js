const chalk = require('chalk')

class Log {
  constructor({ filename }) {
    this.filename = filename
  }

  info(...msgs) {
    console.log(
      chalk.white.bgBlue.bold(`> ${ this.filename } (info):`) +
      ' ' + chalk.blue(msgs.join(' '))
    )
  }

  debug(...msgs) {
    console.log(
      chalk.black.bgWhite.bold(`> ${ this.filename } (debug):`) +
      ' ' + chalk.white(msgs.join(' '))
    )
  }

  warn(...msgs) {
    console.log(
      chalk.black.bgYellow.bold(`> ${ this.filename } (warn):`) +
      ' ' + chalk.yellow(msgs.join(' '))
    )
  }

  error(msg, err) {
    console.log(
      chalk.white.bgRed.bold(`> ${ this.filename } (error):`) +
      ' ' + chalk.red(msg)
    )
    if (err) console.error(err)
  }
}

module.exports = (filename) => new Log({ filename })
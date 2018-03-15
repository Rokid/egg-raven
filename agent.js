'use strict'
const Raven = require('raven')

module.exports = agent => {
  const { raven: { dsn, options } = {} } = agent.config

  Raven.config(dsn, options).install()

  agent.config.coreMiddleware.push('raven')
  agent.on('error', err => {
    Raven.captureException(err, (ravenError, eventId) => {
      if (ravenError) {
        agent.coreLogger.error(ravenError)
      }
    })
  })
}

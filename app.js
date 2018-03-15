'use strict'
const Raven = require('raven')

module.exports = app => {
  const { raven: { dsn, options } = {} } = app.config

  app.config.coreMiddleware.push('raven')

  app.beforeStart(async () => {
    Raven.config(dsn, options).install()
  })

  app.on('error', err => {
    Raven.captureException(err, (ravenError, eventId) => {
      if (ravenError) {
        app.coreLogger.error(ravenError)
      }
    })
  })
}

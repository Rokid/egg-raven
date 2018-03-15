'use strict'
const Raven = require('raven')

module.exports = app => {
  const { raven: { dsn, options } = {} } = app.config

  Raven.config(dsn, options).install()

  app.config.coreMiddleware.push('raven')
  app.raven = Raven
}

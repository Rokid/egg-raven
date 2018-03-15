'use strict'
const Raven = require('raven')

module.exports = app => {
  const { raven: { dsn, options } = {} } = app.config

  app.config.coreMiddleware.push('raven')
  app.raven = Raven

  Raven.config(dsn, options).install()
}

'use strict'

const Raven = require('raven')

module.exports = options => {
  return raven

  function raven (ctx, next) {
    return Raven.context(async function () {
      Raven.setContext({ req: ctx.request.req })
      const ret = await next().then(() => {
        Raven.mergeContext({ user: ctx.user })
      }, err => {
        Raven.mergeContext({ user: ctx.user })
        throw err
      })
      return ret
    })
  }
}

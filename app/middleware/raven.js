'use strict'

const Raven = require('raven')

module.exports = options => {
  return raven

  function raven (ctx, next) {
    return Raven.context({ req: ctx.request }, async function () {
      const ret = await next()
      Raven.mergeContext({ req: ctx.request })
      return ret
    })
  }
}

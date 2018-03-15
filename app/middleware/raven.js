'use strict'

module.exports = options => {
  return raven

  function raven (ctx, next) {
    return ctx.raven.context({ req: ctx.request }, async function () {
      let error
      try {
        await next()
      } catch (err) {
        error = err
        ctx.raven.captureException(err, (ravenError, eventId) => {
          if (ravenError) {
            ctx.coreLogger.error(ravenError)
          }
        })
      }
      ctx.raven.mergeContext({ req: ctx.request })
      if (error) {
        throw error
      }
    })
  }
}

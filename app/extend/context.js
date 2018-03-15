'use strict'
// eslint-disable-next-line node/no-deprecated-api
const domain = require('domain')
const Raven = require('raven')
const { utils: eggUtils } = require('egg-core')

const ravenRunInBackgroundSymbol = Symbol.for('context#ravenRunInBackgroundSymbol')

function runInBackground (scope) {
  const ctx = this
  const start = Date.now()
  /* istanbul ignore next */
  const taskName = scope.name || scope._name || eggUtils.getCalleeFromStack(true)
  if (domain.active) {
    contextRunInBackground()
  } else {
    Raven.context(contextRunInBackground)
  }

  async function contextRunInBackground () {
    Raven.mergeContext({ req: ctx.request })
    // use app.toAsyncFunction to support both generator function and async function
    try {
      await ctx.app.toAsyncFunction(scope)(ctx)
      ctx.coreLogger.info('[egg:background] task:%s success (%dms)', taskName, Date.now() - start)
    } catch (err) {
      Raven.captureException(err, (ravenError, eventId) => {
        if (ravenError) {
          ctx.coreLogger.error(ravenError)
        }
      })
      ctx.coreLogger.info('[egg:background] task:%s fail (%dms)', taskName, Date.now() - start)
      ctx.coreLogger.error(err)
    }
    Raven.mergeContext({ req: ctx.request })
  }
}

module.exports = {
  get ravenRunInBackground () {
    if (this[ravenRunInBackgroundSymbol] == null) {
      this[ravenRunInBackgroundSymbol] = runInBackground.bind(this)
    }
    return this[ravenRunInBackgroundSymbol]
  },
  get raven () {
    // context extend of `runInBackground` in plugin will be overwritten by egg
    this.runInBackground = this.ravenRunInBackground
    return this.app.raven
  }
}

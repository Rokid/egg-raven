
// eslint-disable-next-line node/no-deprecated-api
const domain = require('domain')
const Raven = require('raven')
const { utils: eggUtils } = require('egg-core')

module.exports = {
  runInBackground (scope) {
    const ctx = this
    const start = Date.now()
    /* istanbul ignore next */
    const taskName = scope.name || scope._name || eggUtils.getCalleeFromStack(true)
    if (domain.active) {
      contextRunInBackground()
    } else {
      Raven.context(contextRunInBackground)
    }

    function contextRunInBackground () {
      Raven.mergeContext({ req: ctx.request.req })
      // use app.toAsyncFunction to support both generator function and async function
      ctx.app.toAsyncFunction(scope)(ctx)
        .then(() => {
          Raven.mergeContext({ user: ctx.user })
          ctx.coreLogger.info('[egg:background] task:%s success (%dms)', taskName, Date.now() - start)
        })
        .catch(err => {
          Raven.mergeContext({ user: ctx.user })
          Raven.captureException(err, (ravenError, eventId) => {
            ctx.coreLogger.error(ravenError)
          })
          ctx.coreLogger.info('[egg:background] task:%s fail (%dms)', taskName, Date.now() - start)
          ctx.coreLogger.error(err)
        })
    }
  }
}

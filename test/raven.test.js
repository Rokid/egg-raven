'use strict'

const mock = require('egg-mock')

describe('test/raven.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'apps/raven-test'
    })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, raven')
      .expect(200)
  })
})

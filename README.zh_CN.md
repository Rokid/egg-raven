# egg-raven

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-raven.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-raven
[travis-image]: https://img.shields.io/travis/Rokid/egg-raven.svg?style=flat-square
[travis-url]: https://travis-ci.org/Rokid/egg-raven
[codecov-image]: https://img.shields.io/codecov/c/github/Rokid/egg-raven.svg?style=flat-square
[codecov-url]: https://codecov.io/github/Rokid/egg-raven?branch=master
[david-image]: https://img.shields.io/david/Rokid/egg-raven.svg?style=flat-square
[david-url]: https://david-dm.org/Rokid/egg-raven
[snyk-image]: https://snyk.io/test/npm/egg-raven/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-raven
[download-image]: https://img.shields.io/npm/dm/egg-raven.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-raven

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-raven 版本 | egg 1.x | egg 2.x
--- | --- | ---
1.x | ❌ | ✅

## 开启插件

```js
// config/plugin.js
exports.raven = {
  enable: true,
  package: 'egg-raven',
};
```

## 使用场景

```js
// app/controller/home.js
const { Controller } = require('egg')

class HomeController extends Controller {

  async index () {
    this.ctx.raven.captureBreadcrumb({
      message: 'Received payment confirmation',
      category: 'payment',
      data: {
        amount: 312
      }
    })
  }

  async update() {
    throw new Error('这个错误会和它的上下文一起被记录至 Sentry')
  }

}

module.exports = HomeController
```

## 详细配置

```js
// {app_root}/config/config.default.js
exports.raven = {
  dsn: 'https://your:very_secure@sentry.server/app_id',
  options: {
    // 查看 https://docs.sentry.io/clients/node/config/#optional-settings 获取更多 options 信息
    autoBreadcrumbs: {
      http: true
    },
    release: '721e41770371db95eee98ca2707686226b993eda'
  }
}
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 提问交流

请到 [egg issues](https://github.com/Rokid/egg-raven/issues) 异步交流。

## License

[MIT](LICENSE)

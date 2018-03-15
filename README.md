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

## Install

```bash
$ npm i egg-raven --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.raven = {
  enable: true,
  package: 'egg-raven',
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.raven = {
  dsn: 'https://your:very_secure@sentry.server/app_id',
  options: {
    // refer to https://docs.sentry.io/clients/node/config/#optional-settings for more options detail.
    autoBreadcrumbs: {
      http: true
    },
    release: '721e41770371db95eee98ca2707686226b993eda'
  }
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

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
    this.ctx.runInBackground(async function backgroundJob () {
      throw new Error('will be recorded into sentry with breadcrumbs')
    })
  }

  async update() {
    throw new Error('will be recorded into sentry with detailed context')
  }

}

module.exports = HomeController
```

## Questions & Suggestions

Please open an issue [here](https://github.com/Rokid/egg-raven/issues).

## License

[MIT](LICENSE)

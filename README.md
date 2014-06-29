# Admit One Mongo

[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Code Climate][codeclimate-image]][codeclimate-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][david-image]][david-url] [![devDependencies][david-dev-image]][david-dev-url]

[Admit One][admit-one] adapter for MongoDB.

## Install

```
npm install admit-one admit-one-mongo
```

## Usage

```javascript
var admit = require('admit-one')('mongo', {
  mongo: {
    db: 'mongodb://localhost/dbname'
  }
});
```

Once you have created an instance, see the [main Admit One page][admit-one] for
details on how to set up your routes with Express.

## API

### admit([options])

#### options.mongo.db

Type: `String`  
Default: `undefined`


#### options.mongo.collection

Type: `String`  
Default: `'users'`


## License

This project is distributed under the MIT license.


[travis-url]: http://travis-ci.org/wbyoung/admit-one-mongo
[travis-image]: https://secure.travis-ci.org/wbyoung/admit-one-mongo.png?branch=master
[npm-url]: https://npmjs.org/package/admit-one-mongo
[npm-image]: https://badge.fury.io/js/admit-one-mongo.png
[codeclimate-image]: https://codeclimate.com/github/wbyoung/admit-one-mongo.png
[codeclimate-url]: https://codeclimate.com/github/wbyoung/admit-one-mongo
[coverage-image]: https://coveralls.io/repos/wbyoung/admit-one-mongo/badge.png
[coverage-url]: https://coveralls.io/r/wbyoung/admit-one-mongo
[david-image]: https://david-dm.org/wbyoung/admit-one-mongo.png?theme=shields.io
[david-url]: https://david-dm.org/wbyoung/admit-one-mongo
[david-dev-image]: https://david-dm.org/wbyoung/admit-one-mongo/dev-status.png?theme=shields.io
[david-dev-url]: https://david-dm.org/wbyoung/admit-one-mongo#info=devDependencies

[admit-one]: https://github.com/wbyoung/admit-one

/* eslint-disable global-require */
global.regeneratorRuntime =
  global.regeneratorRuntime || require('babel-runtime/regenerator')

module.exports = require('./lib').default

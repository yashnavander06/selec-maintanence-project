'use strict'

const transport = require('pino-mongodb')

module.exports = function(opts) {
  opts.parseLine = function(str) { // `str` is passed from `pino` and expected to be a string
    const obj = JSON.parse(str)
    
    // do anything you want...

    return obj // return value is expected to be a json that will pass and save inside mongodb
  }
  return transport(opts)
}


// const { createLogger, transports, loggers } = require("winston");
// // const winston = require('winston')

// // const managerlogger = createLogger ({
// //     transports :[
// //         new transports.File({
// //             filename : `info.log`,
// //             level:`info`,
// //             options: { useUnifiedTopology: true } 
// //         })
// //     ]
// // })

// // module.exports = {managerlogger};
const express = require('express');
const pino = require('pino');
const expressPino = require('express-pino-logger');

// const pino = require('pino')
const logger = pino({level: process.env.LOG_LEVEL || 'debug' }, pino.destination(`${__dirname}/logger.log`));
const expressLogger = expressPino({ logger });
    module.exports = {logger}

// const express = require('express');
// const pino = require('pino');
// const expressPino = require('express-pino-logger');

// 
//   pino.destination(`${__dirname}/logger.log`)

// const expressLogger = expressPino({ logger });

// // const levels = {
// //   http: 10,
// //   debug: 20,
// //   info: 30,
// //   warn: 40,
// //   error: 50,
// //   fatal: 60,
// // };
// module.exports = pino(
//   {
//     customLevels: levels, // our defined levels
//     useOnlyCustomLevels: true,
//     level: 'http',
//     // prettyPrint: {
//     //   colorize: true, // colorizes the log
//     //   levelFirst: true,
//     //   translateTime: 'yyyy-dd-mm, h:MM:ss TT',
//     // },
//   },
//   pino.destination(`${__dirname}/logger.log`)
// // )
// // // module.exports = {logger};
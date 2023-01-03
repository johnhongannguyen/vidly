const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.handleExceptions(new winston.transports.File({filename:'uncaughtExceptions.log'}))

process.on('unhandledRejection', ex =>{
  throw ex;
})

// file transport
winston.add(new winston.transports.File({filename: 'logfile.log'}))

// mongodb transport
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/genres',level:'info'}));

// const p = Promise.reject(new Error('something failed miserably '));
// p.then(() => console.log('Done'));
}
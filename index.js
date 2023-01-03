const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);const express = require('express');
const app = express();
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
require('./startup/route')(app);
require('./startup/db')();


// uncaught exception
// process.on('uncaughtException', ex =>{
//   winston.error(ex.message,ex);
//   process.exit(1)
// });

winston.handleExceptions(new winston.transports.File({filename:'uncaughtExceptions.log'}))

process.on('unhandledRejection', ex =>{
  throw ex;
})

// file transport
winston.add(new winston.transports.File({filename: 'logfile.log'}))

// mongodb transport
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/genres',level:'info'}));

const p = Promise.reject(new Error('something failed miserably '));
p.then(() => console.log('Done'));

if(!config.has('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1);
}





app.get('/',(req,res)=>{
  res.send('Welcome to genres API')
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
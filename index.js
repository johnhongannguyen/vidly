const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users')
const auth = require('./routes/auth');
const config = require('config');
const error = require('./middleware/error')
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')

// uncaught exception
process.on('uncaught Exception', ex =>{
  console.log('we got Uncaught Exception');
  winston.error(ex.message,ex);
})

// file transport
winston.add(new winston.transports.File({filename: 'logfile.log'}))

// mongodb transport
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/genres',level:'info'}));

if(!config.has('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1);
}

mongoose.connect('mongodb://localhost/genres',{useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=> console.log('connected to MongoDB...'))
    .catch(err => console.log('Cannot connect to MongoDB'))


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users', users);
app.use('/api/auth',auth);


app.use(error)

app.get('/',(req,res)=>{
  res.send('Welcome to genres API')
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
const mongoose = require('mongoose');
const winston =  require('winston')


module.exports = function (){
    mongoose.connect('mongodb://localhost/genres',{useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=> winston.info('connected to MongoDB...'))
}
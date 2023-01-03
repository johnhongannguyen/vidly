const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre')
Joi.objectId = require('joi-objectid')(Joi);


const Movie = mongoose.model('Movie',new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre : {
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required:true,
        min:0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}))

function validateMovie(movie) {
    const schema = Joi.object( {
        title: Joi.string().min(5).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255)
    })
    return schema.validate(movie);
}

validateMovie();

exports.Movie = Movie;
exports.validate = validateMovie;
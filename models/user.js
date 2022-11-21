const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");


const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

const User = new mongoose.model('User', mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    }, 
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024

    }
}))


const validateUser = (user) =>{
    const schema = Joi.object ({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions)
      });
      return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
const mongoose = require('mongoose');
const Joi =  require('joi')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type:String,
        required: true, 
        minlength: 5,
        maxlength: 255
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type: Number,
        required: true
    }
}));



function validateCustomer(customer){
    const schema = Joi.object ({
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.number().min(10).required(),
        isGold: Joi.boolean()
    })
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
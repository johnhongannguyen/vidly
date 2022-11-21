const express =  require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const mongoose = require('mongoose'); 
const Joi = require('joi');

// destructure 
const {validate, Customer} = require('../models/customer');




router.get('/', async(req,res)=>{
    const customers = await Customer.find().sort('name,phone,isGold');
    res.send(customers);
})

router.post('/',auth,async(req,res)=>{
    // validate error
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // create a new customer
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer);

})
router.put('/:id',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    },{new:true} );

    // could not find id
    if(!customer)return res.status(400).send('The customer with the given ID was not found!!!');

    res.send(customer);
})

// delete a customer

router.delete('/:id', async(req,res)=>{
    const customer = await Genre.findByIdAndRemove(req.body.id);
    if(!customer) return res.status(400).send('The customer with the given ID was not found!!!!');

    res.send(customer);
})

// get a customer by id

router.get('/:id', async(req,res)=>{
    const customer = await Genre.findById(req.body.id);

    if(!customer) res.status(400).send('Cannot find the Customer');

    res.send(customer);
})





module.exports = router;
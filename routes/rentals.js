const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const{Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const Fawn = require('fawn');



Fawn.init("mongodb://localhost:27017/genres")


router.get('/', async (req,res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

// create a new rental 

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);



    // check valid customer
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer !')

    // check valid movie
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie!!')

    // movie renting is not out of stock

    if(movie.numberInStock === 0 ) return res.status(400).send('Movie not in stock.');

    // create new rental object

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    // rental = await rental.save();

    // // decrease number in stock
    // movie.numberInStock--;
    // movie.save();

    // transactions
    try{

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies',{_id: movie._id},{
                $inc: {numberInStock: -1}
            })
            .run()
    }catch(ex){
        // internal sever error 
       res.status(500).send('Something failed')
    }

    res.send(rental);
}) 

router.get('/:id', async(req,res)=>{
    const rental = await Rental.findById(req.params.id);

    if(!rental) return res.status(400).send(' The rental with given ID was not found');

    res.send(rental);
})

module.exports = router;
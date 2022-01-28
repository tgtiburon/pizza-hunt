const res = require('express/lib/response');
const { Pizza }  = require('../models');
const { db } = require('../models/Pizza');

const pizzaController = {
    // the functions will go here as methods

    // get all pizzas
    // GET /api/pizzas      
    getAllPizzas(req,res) {
        Pizza.find({})
        // this populate acts like a join so we can get the comment 
        // info
        .populate({
            path: 'comments',
           // Don't select __v. Without this it would ONLY send __v
            select: '-__v'
        })
        // update query to not include __v either
        .select('-__v')
        // lets sort the query by ages of post -1 desc order
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id
    // GET /api/pizzas/:id
    getPizzaById({ params }, res) {
        // we destructured the req for only the id 
        // we did not need the whole req.
        Pizza.findOne({ _id: params.id })
        // Join comments
            .populate({
                path: 'comments',
                select: '-__v'
            })
            // don't select -__v
            .select('-__v')
            .then(dbPizzaData => {
                // If no pizza found send 404
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                // Pizza found send json data
                res.json(dbPizzaData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST /api/pizzas
    //create pizza
    // we deconstruct the req and pull out only the body
    createPizza({ body }, res) {

        Pizza.create(body)
        .then(dbPizzaData => {
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // PUT /api/pizzas/:id  
    updatePizza({ params, body }, res) {
        // by setting new:true we are telling mongoose to return the new
        // updated document.
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new:true })  
        .then(dbPizzaData => {
            // Can't find id
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with that id!' });
                return;
            }
            // found id
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })

    },

    // DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            // id not found
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            // id found
            res.json(dbPizzaData);

        })
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    }



};


module.exports = pizzaController;
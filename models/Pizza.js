// We only need Schema and model from mongoose
const { Schema, model } = require('mongoose');


const PizzaSchema = new Schema(
    {
        pizzaName: {
            type:String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date, 
            default: Date.now
        },
        size: {
            type: String,
            default: 'Large'
        },
        // toppings is array datatype. could do toppings: Array   too.
        toppings: [], 
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        // Don't send the virtual
        id: false
    }
);


// create the Pizza Model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);






// export the Pizza model
module.exports = Pizza;


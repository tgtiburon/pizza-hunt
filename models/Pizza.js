// We only need Schema and model from mongoose
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


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
            default: Date.now,
            // Use a getter to call our dateFormat function 
            // in the utils folder
            get: (createdAtVal) => dateFormat(createdAtVal)
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
            getters: true
        },
        // Don't send the virtual
        id: false
    }
);

// Use a virtual to get the comment count
PizzaSchema.virtual('commentCount').get(function() {
    // reduce is an array function like map
    // used to tally up the total of every comment with it's replies.
    // Uses accumulator (total) and a current value
    return this.comments.reduce((total, comment) => total + comment.replies.length +1, 0);
});



// create the Pizza Model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);






// export the Pizza model
module.exports = Pizza;


//const res = require('express/lib/response');
const { Comment, Pizza }   = require('../models');


const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {

        console.log(`Params =  ${params}`);
        console.log(`Body = ${body} `);
        Comment.create(body)
        .then(({ _id }) => {
            //console.log(`_id = ${_id}`);
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                // $push adds the comment's id to the specific pizza
                // $ a MongoDB based function 
                { $push: { comments: _id } },
                // new: true means we are passing back the updated pizza
                // with the new comment
                { new: true }
            );
        })
        .then(dbPizzaData => {
            // pizza not found
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            // pizza found
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })

     

    },
    // add reply
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbPizzaData => {
                // no pizza
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                // pizza found
                res.json(dbPizzaData);
            })
            .catch(err => {
                res.json(err);
            })
    },
    // remove reply
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            // We are using mongo $pull to remove the specific 
            // reply from the replies array
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
            .then(dbPizzaData => {
                res.json(dbPizzaData);
            })
            .catch(err => {
                res.json(err);
            })
    },

    // remove comment
    removeComment({ params }, res) {
        // deletes the document while returning it's data
        // we will use this data to identify it and 
        // remove it from the associated pizza
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            // No comment found with that id
            if(!deletedComment) {
                return res.status(404).json({ message: 'No comment with this id!' });

            }
            // Found comment
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                // finds and removes the comment id using MongoDB function
                { $pull: { comments: params.commentId }},
                { new: true }   
            );
        })
        .then(dbPizzaData => {
            // No pizza found
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            // pizza found
            // return updated pizza data
            res.json(dbPizzaData);
        })
        .catch( err => {
            console.log(err);
            res.json(err);
        })

    }
};




module.exports = commentController;


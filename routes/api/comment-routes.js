const router = require('express').Router();
const { 
        addComment,
        removeComment,
        addReply,
        removeReply

        
        
        } = require('../../controllers/comment-controller');


// POST /api/comments/<pizzaId> 
router.route('/:pizzaId').post(addComment);


//  DELETE /api/comments/<pizzaId>/<commentId>
// Need to params because we need to know the comment and the pizza
// it came from.
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// DELETE a reply
// It's RESTful to include the pizzaId (parent resource) as well as the replyId (child resource)
router  
    .route('/:pizzaId/:replyId')
    .delete(removeReply);


// 
module.exports = router;
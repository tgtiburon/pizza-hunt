const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');


// /api/comments/<pizzaId> 
router.route('/:pizzaId').post(addComment);


// /api/comments/<pizzaId>/<commentId>
// Need to params because we need to know the comment and the pizza
// it came from.
router.route('/:pizzaId/:commentId').delete(removeComment);


module.exports = router;
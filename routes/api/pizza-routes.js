const router = require('express').Router();


// instead of importing the entire object we deconstruct it.
// that way we can use the names directly
const {
    getAllPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
}   = require('../../controllers/pizza-controller');




// We can use a new router syntax and combine routes
/*

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);

*/

// Set up the GET and POST at /api/pizzas
router
    .route('/')
    .get(getAllPizzas)
    .post(createPizza);


// Set up GET one, PUT, and DELETE at /api/pizzas/:id

router 
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);


module.exports = router;



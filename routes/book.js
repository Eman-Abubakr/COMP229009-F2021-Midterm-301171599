var express = require('express');
var router = express.Router();
let mongoose= require('mongoose');
let bookController = require('../controllers/book');

//connect to our model
let Book = require('../models/book');

// Methods
// Router for lists books function
router.get('/list', bookController.bookList);

// Router for book details function
router.get('/details/:id', bookController.details);

// Routers for edit functions
/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', bookController.processEditPage);



// Router for Delete function
/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', bookController.performDelete);



// Routers for Add functions
/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', bookController.processAddPage);


module.exports = router;
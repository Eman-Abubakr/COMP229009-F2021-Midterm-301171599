
let mongoose = require('mongoose');

// Create a model class
let bookModel = mongoose.Schema(
    {
        Title: String,
        Description: String,
        Price: Number,
        Author: String,
        Genre: String
        //Actions: String
    },
    {
        collection: "books"
    }
);

module.exports = mongoose.model('Book', bookModel);
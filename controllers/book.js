// create a reference to the model
let Book = require('../models/book');
let mongoose = require('mongoose');
let express = require('express');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function(req, res, next) {  
    Book.find((err, bookList) => {
         console.log(bookList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {
                title: 'Book List', 
                books: bookList
            })            
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details', 
                book: bookToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    
    /* GET Route for displaying the Add page - CREATE Operation */
    let newItem = Book();

    res.render('book/add_edit', {
        title: 'Add a Book',
        book: newItem
    })          
  }


// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {

    
    /* POST Route for processing the Add page - CREATE Operation */
    let newItem = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
    });
  
    Book.create(newItem, (err, book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(book);
            res.redirect('/book/list');
        }
    });
  

}


// Gets a book by id and renders the Edit form using the add_edit.ejs template
/* GET Route for displaying the Edit page - UPDATE Operation */
module.exports.displayEditPage = (req, res, next) => {
    
    
    let id = req.params.id;
    //by passing an id either return the error or itemToEdit
    Book.findById(id, (err, itemToEdit) => { 

            if(err)
            {
                  console(err);
                  res.end(err);
            }
            else
            {
              //show the edit view
              console.log(itemToEdit);

              res.render('book/add_edit',{
                  title: 'Edit a Book',
                  book: itemToEdit  //object
                } );    
            }
          })
  }
    





// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {
     
    /* POST Route for processing the Edit page - UPDATE Operation */
    let id = req.params.id

    console.log(req.body);

   let updatedItem = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
   });

   console.log(updatedItem);

    Book.updateOne({_id: id}, updatedItem, (err) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
            console.log(req.body);
           // refresh the book list
           res.redirect('/book/list');
           //res.redirect('/book/edit');

       }
   });
}




// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
    
    
/* GET to perform  Deletion - DELETE Operation */
let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book/list')
            
        }
    });

}


var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET books */
router.get('/', asyncHandler( async (req, res) => {
  res.redirect('/books')
}));

router.get('/books', asyncHandler( async (req, res) => {
  const books = await Book.findAll({ order: [["id", "ASC"]] })
  res.render('books/index', { books, title: "Books" })
}));

router.get('/books/new', asyncHandler( async (req, res) => {
  res.render('books/new-book')
}))

router.post('/books/new', asyncHandler( async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body)
    res.redirect("/books" + book.id);
  } catch(error) {
    if(error.name === "SequelizeValidationError"){
      book = await Book.build(req.body)
      res.render("books/update-book", { book, errors: error.errors, title: book.title })
    } else {
      throw error;
    }
  }
}))
//update book form
router.get('/books/:id', asyncHandler( async (req, res, next) => {
  const book = await Book.findByPk(req.params.id)
  if(book){
    res.render('books/update-book', { book, title: book.title })
  } else {
    next()
  }
}))
//update book post
router.post('/books/:id', asyncHandler( async (req, res, next) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book){
      await book.update(req.body)
      res.redirect("/books/" + book.id)
    } else {
      next()
    }
  } catch (error){
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("books/update-book", { book, errors: error.errors, title: book.title })
    } else {
      throw error;
    }
  }
}))

router.post('/books/:id/delete', asyncHandler( async (req, res, next) => {
  const book = await Book.findByPk(req.params.id)
  if(book){
    await book.destroy()
    res.redirect("/books")
  }else {
    next()
  }
  res.render()
}))

module.exports = router;

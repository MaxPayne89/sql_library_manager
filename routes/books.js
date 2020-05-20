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
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] })
  res.render('books/index', { books, title: "Books" })
}));

router.get('/books/new', asyncHandler( async (req, res) => {
  res.render()
}))

module.exports = router;

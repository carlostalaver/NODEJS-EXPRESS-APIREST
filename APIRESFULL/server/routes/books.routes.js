const express = require('express');
const bookModel = require('../models/bookModel')
const router = express.Router();
const booksControllers = require('../controllers/books.controller');

router.get('/', booksControllers.getBooks);

//#region  un MIDDLEWARE
router.use('/:id', (req, res, next) => {
  bookModel.findById(req.params.id, (err, book) => {
    if (err) return res.send(err);
    if (book) {
      console.log('Imprimiendo el libro ', book);
      
      req.book = book;
      return next();
    }
    return res.sendStatus(404);
  })
});
//#endregion
router.get('/:id', booksControllers.getBook)
router.post('/', booksControllers.createBook)
router.put('/:id', booksControllers.editBookPut)

module.exports = router;
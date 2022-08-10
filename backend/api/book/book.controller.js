const bookService = require('./book.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getBooks(req, res) {
  try {
    logger.debug('Getting Books')
    var queryParams = req.query
    const books = await bookService.query(queryParams)
    res.json(books)
  } catch (err) {
    logger.error('Failed to get books', err)
    res.status(500).send({ err: 'Failed to get books' })
  }
}

// GET BY ID 
async function getBookById(req, res) {
  try {
    const bookId = req.params.id
    const book = await bookService.getById(bookId)
    res.json(book)
  } catch (err) {
    logger.error('Failed to get book', err)
    res.status(500).send({ err: 'Failed to get book' })
  }
}

// POST (add book)
async function addBook(req, res) {
  try {
    const book = req.body
    const addedBook = await bookService.add(book)
    res.json(addedBook)
  } catch (err) {
    logger.error('Failed to add book', err)
    res.status(500).send({ err: 'Failed to add book' })
  }
}

// PUT (Update book)
async function updateBook(req, res) {
  try {
    const book = req.body
    const updatedBook = await bookService.update(book)
    res.json(updatedBook)
  } catch (err) {
    logger.error('Failed to update book', err)
    res.status(500).send({ err: 'Failed to update book' })

  }
}

// DELETE (Remove book)
async function removeBook(req, res) {
  try {
    const bookId = req.params.id
    await bookService.remove(bookId)
    res.send('Removed')
  } catch (err) {
    logger.error('Failed to remove book', err)
    res.status(500).send({ err: 'Failed to remove book' })
  }
}

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  removeBook
}

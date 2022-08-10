const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBooks, getBookById, addBook, updateBook, removeBook, addReview } = require('./book.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBooks)
router.get('/:id', getBookById)
router.post('/', addBook)
router.put('/:id', updateBook)
router.delete('/:id', removeBook)

module.exports = router
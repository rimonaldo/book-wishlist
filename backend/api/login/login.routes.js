const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { login, logout, signup} = require('./login.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/', login)
router.post('/logout', logout)
router.post('/signup', signup)

// router.get('/:id', getBookById)
// router.post('/', requireAuth, requireAdmin, addBook)
// router.put('/:id', requireAuth, requireAdmin, updateBook)
// router.delete('/:id', requireAuth, requireAdmin, removeBook)

module.exports = router
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    console.log('query')
    try {
        const criteria = _buildCriteria(filterBy)
        console.log(criteria);
        const collection = await dbService.getCollection('book')
        var books = await collection.find(criteria).toArray()
        return books
    } catch (err) {
        logger.error('cannot find books', err)
        throw err
    }
}

async function getById(bookId) {
    try {
        const collection = await dbService.getCollection('book')
        const book = collection.findOne({ _id: ObjectId(bookId) })
        return book
    } catch (err) {
        logger.error(`while finding book ${bookId}`, err)
        throw err
    }
}

async function remove(bookId) {
    try {
        const collection = await dbService.getCollection('book')
        await collection.deleteOne({ _id: ObjectId(bookId) })
        return bookId
    } catch (err) {
        logger.error(`cannot remove book ${bookId}`, err)
        throw err
    }
}

async function add(book) {
    try {
        const collection = await dbService.getCollection('book')
        const addedBook = await collection.insertOne(book)
        return addedBook
    } catch (err) {
        logger.error('cannot insert book', err)
        throw err
    }
}
async function update(book) {
    try {
        var id = ObjectId(book._id)
        delete book._id
        const collection = await dbService.getCollection('book')
        await collection.updateOne({ _id: id }, { $set: { ...book } })
        return book
    } catch (err) {
        logger.error(`cannot update book ${bookId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

function _buildCriteria(filterBy = { minPrice: 0 }) {
    const { txt, inStock, price, byLabel, } = filterBy
    const criteria = {}
    const regex = new RegExp(filterBy.txt, 'i')
    if (txt) criteria.name = { $regex: regex }
    if (price) criteria.price = { $gte: filterBy.minPrice }
    inStock === 'true' ? criteria.inStock = true : delete criteria.inStock
    byLabel ? criteria.labels = { $in: byLabel } : delete criteria.labels
    return criteria
}
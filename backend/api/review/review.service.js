const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log(filterBy);
    try {
        const criteria = _buildCriteria(filterBy)
        console.log(criteria);
        const collection = await dbService.getCollection('review')
        // const reviews = await collection.find(criteria).toArray()
        
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    from: 'book',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project: {
                    _id: 1,
                    content:1,
                    user:{username:1, fullname:1, score:1, isAdmin:1 , _id:1},
                    book:{_id:1, name:1}
                }
            }
        ]).toArray()

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    console.log('made it to review service!!!');
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            bookId: ObjectId(review.bookId),
            content: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId

//     return criteria
// }


function _buildCriteria(filterBy = { minPrice: 0 }) {
    // console.log('filterrrrrr,', filterBy);
    const { bookId } = filterBy
    const criteria = {}
    // const regex = new RegExp(filterBy.bookId, 'i')
    // if (bookId) criteria.bookId = { $regex: regex }
    if (filterBy.bookId) return { bookId: ObjectId(bookId) }


    return criteria
}

module.exports = {
    query,
    remove,
    add
}



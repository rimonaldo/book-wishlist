// import { socketService } from '@/services/socket.service.js'
import { httpService } from './http.service'
import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//127.0.0.1:5173/api/'



export const bookService = {
  query,
  getById,
  save,
  remove,
  getEmptyBook,
}

async function query(filterBy = null) {
  return await httpService.get(`book`, filterBy)
}

async function getById(bookId) {
  return await httpService.get(`book/${bookId}`)
}

async function save(book) {
  if (book._id) {
    // socketService.emit('book updated', book)
    return await httpService.put(`book/${book._id}`, book)
  } else {
    return await httpService.post(`book`, book)
  }
}

async function remove(bookId) {
  return await httpService.delete(`book/${bookId}`)
}

function getEmptyBook() {
  return {
   
  }
}

function _makeId(length = 8) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

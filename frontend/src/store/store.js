import { createStore } from "vuex";
import { bookService } from "../services/book.service";
const store = createStore({
  strict: true,
  state: {
    books: [],
    selectedBook: {},
    wishList:[],
  },
  getters: {
    books({ books }) {
      return books;
    },
    selectedBook({ selectedBook }) {
      return selectedBook;
    },
    wishList({wishList}){
      return wishList
    }
  },
  mutations: {
    setBooks(state, { books }) {
      state.books = books;
    },
    setBook(state, { book }) {
      state.selectedBook = book;
    },
    toggleWishlist(state, { book }) {
      !book.isWished ? (book.isWished = true) : (book.isWished = false);
      const idx = state.books.findIndex((b) => b._id === book._id)
      state.books.splice[idx,1,book]
    },
    
  },
  actions: {
    async loadBooks({ commit }) {
      try {
        const books = await bookService.query();
        commit({ type: "setBooks", books });
        return books;
      } catch (err) {
        console.error("cannot get books:", err);
      }
    },
    async saveItem({ commit }, { book }) {
      const newItem = await bookService.save(book);
      return newItem;
    },
  },
  modules: {},
});

export default store;

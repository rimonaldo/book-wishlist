<template>
  <section v-if="books">
    <section class="body-container">
      <section class="details-container">
        <book-details :book="selectedBook" @toggleWishlist="toggleWishlist" />
        <div class="arrows">
          <button class="prev" @click="pageBook(-1)"></button>
          <button class="for" @click="pageBook(+1)"></button>
        </div>
      </section>
      <wish-list :books="wishedBooks" @toggleWishlist="toggleWishlist" />
    </section>
  </section>
</template>

<script>
import appHeader from '@/cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'
import itemList from './cmps/item-list.vue'
import bookDetails from './cmps/book-details.vue'
import wishList from './cmps/wish-list.vue'
export default {
  components: {
    appHeader,
    appFooter,
    itemList,
    bookDetails,
    wishList,
  },
  data() {
    return {
      selectedBookIdx: 0
    }
  },
  methods: {
    pageBook(direction) {
      let idx = this.selectedBookIdx = this.selectedBookIdx + direction

      if (idx < 0) {
        idx = this.selectedBookIdx = this.books.length - 1
      }
      else if (idx === this.books.length) {
        idx = this.selectedBookIdx = 0
      }
      const book = this.books[idx]
      this.$store.commit({ type: 'setBook', book })
    },
    toggleWishlist(bookId) {
      const idx = this.books.findIndex((b) => b._id === bookId)
      const book = this.books[idx]
      this.$store.commit({ type: 'toggleWishlist', book })
      this.$store.dispatch({ type: 'saveItem', book: this.books[idx] })
    }
  },
  computed: {
    books() {
      return this.$store.getters.books
    },
    selectedBook() {
      if (!this.$store.getters.selectedBook.title) return this.books[0]
      return this.$store.getters.selectedBook
    },
    wishedBooks() {
      return this.books.filter(book => book.isWished)
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadBooks' })
  }

}
</script>



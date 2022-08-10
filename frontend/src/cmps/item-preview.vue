<template>
  <section>
    <div class="book-preview" @click="$router.push('/book/' + book._id)">
      <div class="book-item">{{ book.title }}</div>
      <div class="book-item">{{ book.importance }}</div>
      <div class="book-item">{{ book.createdAt }}</div>
      <div class="book-item">{{ book.doneAt }}</div>
      <div class="book-item">{{ book.status }}</div>
    </div>
    <router-view></router-view>
  </section>
</template>
 <script>
export default {
  name: 'ProjectApp',
  props: {
    book: Object
  },
  components: {},
  data() {
    return {};
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
 <style>

 .book-preview{
  display: flex;
  border: 1px black solid;
  justify-content: space-between;
 }
 </style>
 

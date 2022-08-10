<template>
  <section v-if="books" class="book-list">
    <item-preview  v-for="book in books" :key="book._id" :book="book"></item-preview>
  </section>
</template>
 <script>
 import itemPreview from './item-preview.vue';
export default {
  name: 'ProjectApp',
  props: {
  },
  components: {
    itemPreview,

  },
  data() {
    return {

    };
  },
  created() { 
    console.log('gbooks', this.books);
  },
  methods: {},
  computed: {
     books() {
      return this.$store.getters.books
    }
  },
  unmounted() { },
};
</script>
 <style>

  .book-list{
    border: 1px black solid;
  }

 </style>
<template>
    <section class="wish-list">
        <ul v-for="book in books" :key="book._id">
            <wish-preview :book="book" @toggleWishlist="toggle" />
        </ul>
    </section>
</template>
 <script>
import wishPreview from './wish-preview.vue';
export default {
    name: 'wishList',
    components: { wishPreview },
    props: {
        books: Array
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        toggle(bookId){
            console.log(bookId);
            this.$emit('toggleWishlist', bookId)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>
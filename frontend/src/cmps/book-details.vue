<template>
    <section class="book-details" v-if="book">
        <header>
            <h2>{{book.title}}</h2>
            <input v-model="book.isWished" type="checkbox" @click="$emit('toggleWishlist',book._id)">
        </header>

        <body>
            <h2>{{book.author}}</h2>
            <p>{{book.description}}</p>
        </body>

        <footer>
            <div class="rating">
                <span>Rating: </span>
                <div class="stars">{{book.rating}}</div>
            </div>

            <div class="price">
                <span>Price: </span>
                <div>${{book.price}}</div>
            </div>
        </footer>
    </section>
</template>
 <script>
export default {
    name: 'bookDetails',
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
 </style>
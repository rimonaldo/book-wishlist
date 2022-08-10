<template>
    <li class="wish-preview">
        <div class="mark"></div>
        <body>
            <div class="title">{{ book.title }}</div>
            <button @click="$emit('toggleWishlist',book._id)">x</button>
        </body>
    </li>
</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    props: {
        book: Object
    },
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
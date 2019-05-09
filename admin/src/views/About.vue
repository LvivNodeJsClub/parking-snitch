<template>
    <div class="about">
        <h1>This is an about page</h1>
        <md-button class="md-raised">Default</md-button>

        <div>
            Clicked: {{ count }} times, count is {{ evenOrOdd }}.
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
            <button @click="incrementIfOdd">Increment if odd</button>
            <button @click="incrementAsync">Increment async</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'

    export default {
        name: 'About',
        components: {},
        computed: {
            ...mapState({
                count: ({counter}) => counter.count,
            }),
            ...mapGetters('counter', {
                evenOrOdd: 'evenOrOdd',
            }),
        },
        methods: {
            increment () {
                this.$store.dispatch('counter/increment')
            },
            ...mapActions('counter', [
                'decrement',
                'incrementIfOdd',
                'incrementAsync'
            ])
        },
    }
</script>

<template>
    <form novalidate class="md-layout" @submit.prevent="updateInspector(inspector)">

        <md-field>
            <label for="name">Name</label>
            <md-input name="name" id="name" autocomplete="given-name" v-model="inspector.name" />
        </md-field>
        <md-field>
            <label for="email">Email</label>
            <md-input name="email" id="email" autocomplete="given-name" v-model="inspector.email" />
        </md-field>

        <md-button type="submit" class="md-primary">Create user</md-button>
    </form>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Inspector-Edit',

        created() {
            this.getInspector(this.$route.params.id);
        },
        computed: {
            ...mapState({
                inspector({inspectors}) {
                    return {...inspectors.byId[this.$route.params.id]} || {}
                },
            }),
        },
        methods: {
            ...mapActions('inspectors', [
                'getInspector',
                'updateInspector',
            ])
        },
    }
</script>

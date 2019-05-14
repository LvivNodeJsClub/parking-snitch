<template>
    <div class="about">
        <md-table>
            <md-table-row>
                <md-table-head>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
            </md-table-row>

            <md-table-row v-bind:key="inspector._id" v-for="inspector in inspectors">
                <md-table-cell>{{inspector._id}}</md-table-cell>
                <md-table-cell>{{inspector.name}}</md-table-cell>
                <md-table-cell>{{inspector.email}}</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    //import { getAllInspectors } from '@/api/inspectors'

    export default {
        name: 'Inspectors',

        mounted() {
            this.getInspectors();
        },
        computed: {
            ...mapState({
                inspectors: ({inspectors}) => inspectors.inspectorsAll,
            }),
        },
        methods: {
            ...mapActions('inspectors', [
                'getInspectors',
            ]),
        },
    }
</script>

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
    import { mapGetters, mapState } from 'vuex'
    import {getAllInspectors} from '@/api/inspectors'

    export default {
        name: 'Inspectors',
        data() {
            return {
                inspectors: [],
            }
        },
        async mounted() {
            this.inspectors = await getAllInspectors();
        },
        computed: {
            ...mapState({
                count: ({counter}) => counter.count,
            }),
            ...mapGetters('counter', {
                evenOrOdd: 'evenOrOdd',
            }),
        },
        methods: {
            getInspectors() {
                return getAllInspectors();
            },
        },
    }
</script>

<template>
    <div class="about">
        <md-table>
            <md-table-row>
                <md-table-head>ID</md-table-head>
                <md-table-head>Type</md-table-head>
                <md-table-head>Report</md-table-head>
                <md-table-head>Inspector</md-table-head>
            </md-table-row>

            <md-table-row v-bind:key="notification._id" v-for="notification in notifications">
                <md-table-cell>{{notification._id}}</md-table-cell>
                <md-table-cell>{{notification.type}}</md-table-cell>
                <md-table-cell>{{notification.reportId}}</md-table-cell>
                <md-table-cell>{{notification.inspectorId}}</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {getAllNotifications} from '@/api/notifications'

    export default {
        name:     'Notifications',
        data() {
            return {
                notifications: [],
            }
        },
        async mounted() {
            this.notifications = await getAllNotifications();
        },
        computed: {
            ...mapState({
                count: ({counter}) => counter.count,
            }),
            ...mapGetters('counter', {
                evenOrOdd: 'evenOrOdd',
            }),
        },
        methods:  {
            getNotifications() {
                return getAllNotifications();
            },
        },
    }
</script>

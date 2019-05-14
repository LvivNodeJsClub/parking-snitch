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
                <md-table-cell><router-link class="md-list-item-text" v-bind:to="{ name: 'inspector-details', params: { id: notification.inspectorId }}">{{notification.inspector.name || notification.inspectorId}}</router-link></md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Notifications',

        mounted() {
            this.getInspectors();
            this.getNotifications();
        },
        computed: {
            ...mapState({
                notifications: ({notifications, inspectors}) => {
                    return Object.values(notifications.byId)
                    .map(notification => {
                        notification.inspector = inspectors.byId[notification.inspectorId]
                        return notification
                    })
                },
            }),
        },
        methods: {
            ...mapActions('notifications', [
                'getNotifications',
            ]),

            ...mapActions('inspectors', [
                'getInspectors',
            ]),

            goToInspectorDetail(inspectorId) {
                this.$router.push(`/inspectors/${inspectorId}`)
            }
        },
    }
</script>

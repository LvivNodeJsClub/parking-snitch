<template>
    <div class="about">
        <md-table>
            <md-table-row>
                <md-table-head>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head />
            </md-table-row>

            <md-table-row
                v-for="inspector in inspectors"
                v-bind:key="inspector._id"
                v-on:click="goToInspectorDetail(inspector._id)"
            >
                <md-table-cell>{{inspector._id}}</md-table-cell>
                <md-table-cell>{{inspector.name}}</md-table-cell>
                <md-table-cell>{{inspector.email}}</md-table-cell>
                <md-table-cell class="action-buttons-group">
                    <md-menu
                        md-size="auto"
                        md-direction="bottom-end"
                        v-on:click.stop="setActiveMenuItem(inspector._id)"
                        :md-active="activeMenuItemId === inspector._id"
                    >
                        <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                        </md-button>

                        <md-menu-content>
                            <md-menu-item @click="goToInspectorEdit(inspector._id)">
                                <md-icon>edit</md-icon>
                                <span class="md-list-item-text">Edit</span>
                            </md-menu-item>
                            <md-menu-item @click="confirmInspectorRemoval(inspector._id)">
                                <md-icon>delete</md-icon>
                                <span class="md-list-item-text">Delete</span>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-table-cell>
            </md-table-row>

        </md-table>

        <md-button to="/inspectors/add" class="md-fab md-primary md-fab-bottom-right">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Inspectors',

        data() {
            return {
                active: false,
                activeMenuItemId: null,
            }
        },
        async mounted() {
            this.getInspectors();
        },
        computed: {
            ...mapState({
                inspectors: ({inspectors}) => Object.values(inspectors.byId),
            }),
        },
        methods: {
            ...mapActions('inspectors', [
                'getInspectors',
                'deleteInspector',
            ]),

            goToInspectorDetail(inspectorId) {
                this.$router.push(`/inspectors/${inspectorId}`)
            },
            goToInspectorEdit(inspectorId) {
                this.$router.push(`/inspectors/${inspectorId}/edit`)
            },
            async confirmInspectorRemoval(inspectorId) {
                const isConfirmed = await this.$confirm('Are you sure you want to delete inspector?');

                if (isConfirmed) {
                    this.deleteInspector(inspectorId)
                }
            },

            setActiveMenuItem(id) {
                this.activeMenuItemId = id;
            }
        },
    }
</script>

<style scoped lang="scss">
    .md-table-cell.action-buttons-group {
        width: 10px;

        & /deep/ {
            .md-table-cell-container {
                padding: 0 10px;
            }
        }
    }

    .md-menu-content {
        & /deep/ {
            .md-list-item-content {
                > .md-icon:first-child {
                    margin-right: 24px;
                }
            }
        }
    }
</style>

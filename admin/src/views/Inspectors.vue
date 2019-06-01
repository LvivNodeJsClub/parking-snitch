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
                            <md-menu-item @click="deleteInspector(inspector._id)">
                                <md-icon>delete</md-icon>
                                <span class="md-list-item-text">Delete</span>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-table-cell>
            </md-table-row>

        </md-table>

        <md-dialog-confirm
            :md-active.sync="active"
            md-title="Use Google's location service?"
            md-content="Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running."
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-cancel="onCancel"
            @md-confirm="onConfirm"
        />
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
            ]),

            onConfirm() {
                return 111
            },
            onCancel() {
                return 222
            },

            goToInspectorDetail(inspectorId) {
                this.$router.push(`/inspectors/${inspectorId}`)
            },
            goToInspectorEdit(inspectorId) {
                this.$router.push(`/inspectors/${inspectorId}/edit`)
            },
            async deleteInspector(inspectorId) {
                const isConfirmed = await this.$confirm('Are you sure you want to delete inspector?');

                if (isConfirmed) {
                    console.log("Deleted")
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

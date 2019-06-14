<template>
    <inspector-config-form
        type="edit"
        :inspector="inspector"
        @submit="updateInspector"
    />
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import InspectorConfigForm from '@/components/InspectorConfigForm'

    export default {
        name: 'Inspector-Edit',
        components: {
            InspectorConfigForm,
        },

        created() {
            this.getInspector(this.$route.params.id);
        },
        computed: {
            ...mapState({
                inspector({inspectors}) {
                    return {...inspectors.byId[this.$route.params.id]} || {}
                },
                error({inspectors}) {
                    return inspectors.error['inspector']
                },
            }),
        },
        methods: {
            ...mapActions('inspectors', [
                'getInspector',
            ]),
            async updateInspector(inspector) {
                await this.$store.dispatch('inspectors/updateInspector', inspector);
                if (!this.error) {
                    this.$router.push('/inspectors')
                }
            }
        },
    }
</script>

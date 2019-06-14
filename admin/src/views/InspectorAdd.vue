<template>
    <inspector-config-form @submit="addInspector" />
</template>

<script>
    import { mapState } from 'vuex'
    import InspectorConfigForm from '@/components/InspectorConfigForm'

    export default {
        name: 'Inspector-Edit',
        components: {
            InspectorConfigForm,
        },
        computed: {
            ...mapState({
                error({inspectors}) {
                    return inspectors.error['inspector']
                },
            }),
        },
        methods: {
            async addInspector(inspector) {
                await this.$store.dispatch('inspectors/addInspector', inspector);
                if (!this.error) {
                    this.$router.push('/inspectors')
                }
            }
        },
    }
</script>

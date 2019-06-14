<template>
    <div>
        <h3 class="md-display-3">{{inspector.name}}</h3>
        <div class="md-subheading">{{inspector.email}}</div>
        <div class="md-body-1">Latitude: {{inspector.location.lat}}, Longitude: {{inspector.location.lon}}</div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Inspector-Details',

        created() {
            this.getInspector(this.$route.params.id);
        },
        computed: {
            ...mapState({
                inspector({inspectors}) {
                    return inspectors.byId[this.$route.params.id] || {location:{}}
                },
            }),
        },
        methods: {
            ...mapActions('inspectors', [
                'getInspector',
            ]),
        },
    }
</script>

<template>
    <form novalidate class="md-layout" @submit.prevent="handleSubmitForm(inspector)">
        <md-field>
            <label for="name">Name</label>
            <md-input name="name" id="name" autocomplete="given-name" v-model="inspector.name" />
        </md-field>
        <md-field>
            <label for="email">Email</label>
            <md-input name="email" id="email" autocomplete="given-name" v-model="inspector.email" />
        </md-field>

        <md-button type="submit" class="md-primary">{{buttonLabel}}</md-button>
    </form>
</template>

<script>
    export default {
        name: 'Inspector-Config-Form',

        computed: {
            inspector() {
                return this.$attrs.inspector || {}
            },
            buttonLabel() {
                return this.$attrs.type === "edit" ? "Update inspector" : "Add inspector"
            }
        },
        methods: {
            handleSubmitForm(inspector) {
                this.$emit('submit', inspector);
            }
        },
    }
</script>

<template>
    <md-app id="app" md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary">
            <span class="md-title">{{$route.meta.title}}</span>
        </md-app-toolbar>


        <md-app-drawer md-permanent="full">
            <md-toolbar class="md-transparent" md-elevation="0">
                Navigation
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>home</md-icon>
                    <router-link class="md-list-item-text" to="/">Home</router-link>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <router-link class="md-list-item-text" to="/about">About</router-link>
                </md-list-item>

                <md-list-item>
                    <md-icon>delete</md-icon>
                    <router-link class="md-list-item-text" to="/inspectors">Inspectors</router-link>
                </md-list-item>
            </md-list>
        </md-app-drawer>

        <md-app-content>
            <slot></slot>
        </md-app-content>
    </md-app>
</template>

<script>
    export default {
        name: 'Layout',
    }
</script>

<style>
    #app {
        min-height: 100vh;
    }
</style>

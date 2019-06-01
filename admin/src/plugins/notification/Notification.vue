<template>
    <div v-if="notification">

        <md-dialog-confirm
            v-if="typeConfirm"
            md-active
            :md-title="title"
            :md-content="content"
            :md-confirm-text="confirmText"
            :md-cancel-text="cancelText"
            @md-cancel="resolve(false)"
            @md-confirm="resolve(true)"
        />

        <md-dialog-alert
            v-if="typeAlert"
            md-active
            :md-title="title"
            :md-content="content"
            :md-confirm-text="confirmText"
            @update:mdActive="resolve(true)"
        />

        <md-dialog-prompt
            v-if="typePrompt"
            md-active
            v-model="promptValue"
            :md-title="title"
            :md-content="content"
            :md-input-placeholder="inputPlaceholder"
            md-input-maxlength="60"
            :md-confirm-text="confirmText"
            :md-cancel-text="cancelText"
            @md-cancel="resolve(null)"
            @md-confirm="resolve(promptValue)"
        />

    </div>
</template>

<script>
    import { events, notificationType } from './utils';
    import { getEventBus } from './index';


    export default {
        data() {
            return {
                promptValue: null,
                notifications: [],
            };
        },
        methods: {
            onShowNotification(notification) {
                this.notifications.push(notification);
            },
            onHideNotification(notification) {
                this.promptValue = null;
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            },
            onEscapeUp(event) {
                if (event.code === "Escape" && this.notification) {
                    this.resolve(null);
                }
            },
        },
        mounted() {
            getEventBus().$on(events.SHOW_NOTIFICATION, this.onShowNotification);
            getEventBus().$on(events.HIDE_NOTIFICATION, this.onHideNotification);
        },
        computed: {
            resolve() {
                return this.notification ? this.notification.resolve : null;
            },
            title() {
                return this.notification ? this.notification.title : null;
            },
            content() {
                return this.notification ? this.notification.content : null;
            },
            inputPlaceholder() {
                return this.notification ? this.notification.inputPlaceholder : null;
            },
            confirmText() {
                return this.notification ? this.notification.confirmText : null;
            },
            cancelText() {
                return this.notification ? this.notification.cancelText : null;
            },

            typeConfirm() {
                return Boolean(this.notification && this.notification.type && this.notification.type === notificationType.CONFIRM);
            },
            typeAlert() {
                return Boolean(this.notification && this.notification.type && this.notification.type === notificationType.ALERT);
            },
            typePrompt() {
                return Boolean(this.notification && this.notification.type && this.notification.type === notificationType.PROMPT);
            },

            notification() {
                return this.notifications[0];
            },
        },
        watch: {
            notification(val) {
                if (val) {
                    window.addEventListener('keyup', this.onEscapeUp);
                } else {
                    window.removeEventListener('keyup', this.onEscapeUp);
                }
            },
        },
        beforeDestroy() {
            getEventBus().$off(events.SHOW_NOTIFICATION, this.onShowNotification);
            getEventBus().$off(events.HIDE_NOTIFICATION, this.onHideNotification);
        },
    }
</script>


import Notification from './Notification.vue'
import {notify, defaultOptions, notificationType, createNotifyParams} from './utils';

let eventBus;

// main methods

/**
 * ConfirmParams
 * @typedef {Object} ConfirmParams
 * @property {string} title - Dialog title
 * @property {string} content - Dialog content
 * @property {string} confirmText - Dialog confirm button text
 * @property {string} cancelText - Dialog cancel button text
 */
/**
 * Confirmation dialog
 * @param {ConfirmParams | string} params
 * @return {Promise<Boolean | null>}
 */
export function confirm(params) {
    return notify(createNotifyParams(params, notificationType.CONFIRM), eventBus);
}

/**
 * AlertParams
 * @typedef {Object} AlertParams
 * @property {string} title - Dialog title
 * @property {string} content - Dialog content
 * @property {string} confirmText - Dialog confirm button text
 */
/**
 * Alert dialog
 * @param {AlertParams | string} params
 * @return {Promise<Boolean | null>}
 */
export function alert(params) {
    return notify(createNotifyParams(params, notificationType.ALERT), eventBus);
}

/**
 * PromptParams
 * @typedef {Object} PromptParams
 * @property {string} title - Dialog title
 * @property {string} content - Dialog content
 * @property {string} inputPlaceholder - Prompt input placeholder
 * @property {string} confirmText - Dialog confirm button text
 * @property {string} cancelText - Dialog cancel button text
 */
/**
 * Prompt dialog
 * @param {PromptParams | string} params
 * @return {Promise<String | null>}
 */
export function prompt(params) {
    return notify(createNotifyParams(params, notificationType.PROMPT), eventBus);
}

export const getEventBus = () => {
    if (eventBus === undefined) {
        throw new Error('Plugin has not been initialized yet, cannot get eventBus');
    }
    return eventBus;
};

// define as empty object so we can export it
export const options = {};

export default {
    install(Vue, userOptions = {}) {
        Object.assign(options, defaultOptions, userOptions);

        eventBus = new Vue();

        if (options.addMethodsToVue) {
            Vue.prototype.$alert = alert;
            Vue.prototype.$confirm = confirm;
            Vue.prototype.$prompt = prompt;
        }

        // register the default component
        Vue.component(options.componentName, Notification);
    },
};
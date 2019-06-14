export const defaultOptions = {
    addMethodsToVue: true,
    componentName: 'notification',
};

export const events = {
    SHOW_NOTIFICATION: 'showNotification',
    HIDE_NOTIFICATION: 'hideNotification',
};

export const notificationType = {
    ALERT: 'alert',
    CONFIRM: 'confirm',
    PROMPT: 'prompt',
};


/**
 * Create the data-object that is needed to call the notify method.
 * @param {object | string} params
 * @param {string} type
 */
export function createNotifyParams(params, type) {
    if (!Object.values(notificationType).includes(type)) {
        throw new Error(`Unknown type: ${type}`);
    }

    params = typeof params === 'string' ? { content: params } : params;

    switch (type) {
        case notificationType.ALERT: {
            params = {
                title: 'Alert',
                confirmText: 'Okay',
                ...params,
            };
            break;
        }
        case notificationType.CONFIRM: {
            params = {
                title: 'Confirm',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                ...params,
            };
            break;
        }
        case notificationType.PROMPT: {
            params = {
                title: 'Prompt',
                inputPlaceholder: '',
                ...params,
            };
            break;
        }
    }

    return {
        type,
        ...params,
    };
}


export function notify(params, eventBus) {
    return new Promise(resolve => {
        params.resolve = resolve;
        eventBus.$emit(events.SHOW_NOTIFICATION, params);
    }).then(result => {
        eventBus.$emit(events.HIDE_NOTIFICATION, params);
        return result;
    });
}

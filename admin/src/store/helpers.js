import Vue from 'vue';

export const STATUSES = {
    pending: "PENDING",
    success: "SUCCESS",
    error: "ERROR",
};

/**
 * Helper function to log Axios error in dev tools
 * @param {AxiosError} error
 */
function logError(error) {
    /* eslint-disable no-console */
    console.groupCollapsed(`%cError: ${error.config.method.toUpperCase()} ${error.config.url}`, 'color: #f00');
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    console.groupEnd();
    /* eslint-enable no-console */
}

/**
 *
 * @param {ActionContext} context - Vuex action context
 * @param {String} type - Vuex mutation type
 * @param {Function} request - Axios request
 */
export async function fetchApi(context, type, request) {
    context.commit({
        type,
        meta: {status: STATUSES.pending},
    });

    try {
        const response = await request();
        context.commit({
            type,
            meta: {status: STATUSES.success},
            payload: response.data,
        });
    } catch (error) {
        logError(error);

        context.commit({
            type,
            meta: {status: STATUSES.error},
            payload: error,
        });

        Vue.toasted.error(error.message, {
            duration: 5000,
            action : {
                text : 'Cancel',
                onClick(e, toastObject) {
                    toastObject.goAway(0);
                }
            },
        });
    }
}


/**
 * Helper function to update store with loading, error, .etc props
 * @param {Object} state - Current state of the store
 * @param {Object} action - Action object, contains meta, payload and type props
 * @param {Object} values - Any additional state to be assigned
 */
export function updateState(state, action, values) {
    const { type, payload, meta } = action;

    switch (meta.status) {
        case STATUSES.success:
            Object.assign(state, {
                ...values,
                error: {
                    ...state.error,
                    [type]: null,
                },
                loading: {
                    ...state.loading,
                    [type]: false,
                },
            });

            break;

        case STATUSES.error:
            Object.assign(state, {
                error: {
                    ...state.error,
                    [type]: payload.message,
                },
                loading: {
                    ...state.loading,
                    [type]: false,
                },
            });

            break;

        case STATUSES.pending:
        default:
            Object.assign(state, {
                error: {
                    ...state.error,
                    [type]: null,
                },
                loading: {
                    ...state.loading,
                    [type]: true,
                },
            });

            break;
    }
}


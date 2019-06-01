import _keyBy from 'lodash/keyBy'
import {getAllNotifications} from '@/api/notifications'

export const FOO = 'setNotifications';

const state = {
    byId: {},
};


const getters = {};


const actions = {
    async getNotifications({commit}) {
        const {data} = await getAllNotifications();
        const notificationsById = _keyBy(data, '_id');

        commit({
            type: FOO,
            notificationsById
        });
    }
};


const mutations = {
    [FOO](state, {notificationsById}) {
        state.byId = notificationsById
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

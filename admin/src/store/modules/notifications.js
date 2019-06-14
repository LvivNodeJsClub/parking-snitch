import _keyBy from 'lodash/keyBy'
import {getAllNotifications} from '@/api/notifications'


const state = {
    byId: {},
};


const getters = {};


const actions = {
    async getNotifications({commit}) {
        const {data} = await getAllNotifications();
        const notificationsById = _keyBy(data, '_id');

        commit({
            type: 'setNotifications',
            notificationsById
        });
    }
};


const mutations = {
    setNotifications(state, {notificationsById}) {
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

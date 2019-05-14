import { getAllInspectors } from '@/api/inspectors'

const state = {
    inspectorsAll: [],
};


const getters = {};


const actions = {
    async getInspectors({ commit }) {
        const { data } = await getAllInspectors();

        commit({
            type: 'addInspectors',
            inspectorsAll: data,
        });
    }
};


const mutations = {
    addInspectors(state, { inspectorsAll }) {
        state.inspectorsAll = inspectorsAll
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

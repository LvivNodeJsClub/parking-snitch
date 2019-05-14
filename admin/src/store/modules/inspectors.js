import _keyBy from 'lodash/keyBy'
import { getAllInspectors, getInspectorById } from '@/api/inspectors'

const state = {
    byId: {},
};


const getters = {};


const actions = {
    async getInspectors({ commit }) {
        const { data } = await getAllInspectors();
        const inspectorsById = _keyBy(data, '_id');

        commit({
            type: 'setInspectors',
            inspectorsById,
        });
    },
    async getInspector({ commit }, id) {
        const { data } = await getInspectorById(id);

        commit({
            type: 'setInspector',
            inspector: data,
        });
    }
};


const mutations = {
    setInspectors(state, { inspectorsById }) {
        state.byId = inspectorsById
    },
    setInspector(state, { inspector }) {
        state.byId = {
            ...state.byId,
            [inspector._id]: inspector,
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

import _keyBy from 'lodash/keyBy'
import { fetchApi, updateState, STATUSES } from '@/store/helpers';
import { getAllInspectors, getInspectorById, updateInspector, addInspector, deleteInspector } from '@/api/inspectors';

const state = {
    byId: {},

    error: {},
    loading: {},
};


const getters = {};


const actions = {
    getInspectors: context => fetchApi(
        context,
        'inspectors',
        getAllInspectors,
    ),
    getInspector: (context, id) => fetchApi(
        context,
        'inspector',
        () => getInspectorById(id),
    ),
    updateInspector: (context, data) => fetchApi(
        context,
        'inspector',
        () => updateInspector(data),
    ),
    deleteInspector: (context, data) => fetchApi(
        context,
        'deleteInspector',
        () => deleteInspector(data),
        {
            inspectorId: data,
        },
    ),
    addInspector: (context, data) => fetchApi(
        context,
        'inspector',
        () => addInspector(data),
    ),
};


const mutations = {
    inspectors(state, action) {
        const { payload, meta } = action;
        const byId = meta.status === STATUSES.success && _keyBy(payload, '_id');
        updateState(state, action, byId && { byId });
    },
    inspector(state, action) {
        const { payload, meta } = action;
        const byId = meta.status === STATUSES.success && { ...state.byId, [payload._id]: payload } ;
        updateState(state, action, byId && { byId });
    },
    deleteInspector(state, action) {
        const { meta: { status, inspectorId }} = action;
        const byId = status === STATUSES.success && { ...state.byId };
        delete byId[inspectorId];
        updateState(state, action, byId && { byId });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

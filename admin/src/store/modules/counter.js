const state = {
    count: 0,
};

// getters
const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
};

// actions
const actions = {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    incrementIfOdd ({ commit, state }) {
        if ((state.count + 1) % 2 === 0) {
            commit('increment')
        }
    },
    async incrementAsync ({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('increment');
                resolve()
            }, 1000)
        })
    }
};

// mutations
const mutations = {
    increment (state) {
        state.count++
    },
    decrement (state) {
        state.count--
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
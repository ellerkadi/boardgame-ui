import { createStore } from 'vuex';

const store = createStore({
    state: {
        username: '', // Initially empty, will be updated after login
    },
    mutations: {
        setUsername(state, username) {
            state.username = username; // Update the username in the store
        },
    },
    actions: {},
    modules: {},
});

export default store;
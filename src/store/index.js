import { createStore } from 'vuex';

const store = createStore({
    state: {
        username: '',
        role: '',
        isLoggedIn: false, // Track login status globally
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        //setRole(state, role) {
        //    state.role = role;
        //},
        setIsLoggedIn(state, status) {
            state.isLoggedIn = status; // Update the login state globally
        },
    },
    actions: {
        login({ commit }, { username, token }) {
            commit('setUsername', username);
            //commit('setRole', role);
            commit('setIsLoggedIn', true); // Set logged in status in store
            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedInUser', JSON.stringify({ username }));
        },
        logout({ commit }) {
            commit('setIsLoggedIn', false);
            //commit('setRole', '');
            localStorage.removeItem('authToken');
            localStorage.removeItem('loggedInUser');
        },
    },
});

export default store;
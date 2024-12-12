import { createStore } from 'vuex';
import axiosInstance from "@/axiosConfig";


const store = createStore({
    state: {
        username: '',
        role: '',

        isLoggedIn: false,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setRole(state, role) {
            state.role = role;
        },

        setIsLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
    },

    actions: {
        async fetchRole({ commit }) {
            try {
                const response = await axiosInstance.get("/getUserRole", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                const role = response.data;
                commit("setRole", role);
                localStorage.setItem("userRole", role);
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        },

        login({ commit }, { username, token }) {
            commit('setUsername', username);
            commit("setIsLoggedIn", true);
            this.dispatch("fetchRole");
            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedInUser', JSON.stringify({ username }));
        },
        logout({ commit }) {
            commit('setIsLoggedIn', false);
            localStorage.removeItem('authToken');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userRole');
            localStorage.clear();
        },
    },
});

export default store;
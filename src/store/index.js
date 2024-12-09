import { createStore } from 'vuex';
import { fetchUserRole } from "@/components/ApprovedGamesTable.vue";

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
        setRole(state, role) {
            state.role = role;
        },
        setIsLoggedIn(state, status) {
            state.isLoggedIn = status; // Update the login state globally
        },
    },

    actions: {
        async fetchRole({ commit }) {
            try {
                const response = await fetchUserRole(); // Fetch user role from backend
                if (response.data && response.data.length > 0) {
                    const loggedInUser = response.data.find(user => user.username === this.state.username);
                    if (loggedInUser && loggedInUser.role) {
                        commit("setRole", loggedInUser.role); // Set role in state
                    } else {
                        console.error("Role not found for user:", loggedInUser);
                    }
                } else {
                    console.error("No users found in response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        },
        login({ commit }, { username, token }) {
            commit('setUsername', username);
            this.dispatch("fetchRole");
            commit("setIsLoggedIn", true); // Set logged in status in store
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
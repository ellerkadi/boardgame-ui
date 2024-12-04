import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '@/components/HomeView.vue';
import LoginForm from '@/components/LoginForm.vue';
import SearchGames from '@/components/SearchGames.vue';
import AddGameForm from '@/components/AddGameForm.vue';
import PendingGamesTable from '@/components/PendingGamesTable.vue';
import ApprovedGamesTable from '@/components/ApprovedGamesTable.vue';

const routes = [
    // { path: '/', component: HomeView, name: 'Home' },
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginForm, name: 'Login' },
    { path: '/search-games', component: SearchGames, meta: { requiresAuth: true }  },
    { path: '/add-game', component: AddGameForm, name: 'AddGameForm', meta: { requiresAuth: true } },
    { path: '/pending-games', component: PendingGamesTable, name: 'PendingGames', meta: { requiresAuth: true } },
    { path: '/approved-games', component: ApprovedGamesTable, name: 'ApprovedGames', meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    /*const isAuthenticated = !!localStorage.getItem('authToken');*/
    if (to.meta.requiresAuth) {
        next({ path: '/login' });  // Redirect to login if not authenticated
    } else {
        next();  // Allow navigation if authenticated
    }
});

export default router;

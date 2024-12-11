import { createRouter, createWebHistory } from 'vue-router';
import {jwtDecode} from 'jwt-decode';

import HomePage from '@/pages/HomePage.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import SearchGames from '@/components/SearchGames.vue';
import AddGameForm from '@/components/AddGameForm.vue';
import PendingGamesTable from '@/components/PendingGamesTable.vue';
import ApprovedGamesTable from '@/components/ApprovedGamesTable.vue';
import AdminPage from "@/pages/AdminPage.vue";
import UserPage from "@/pages/UserPage.vue";
import UserGames from "@/components/UserGames.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import ProfileDetailsForm from "@/components/ProfileDetailsForm.vue";

const routes = [
    { path: '/', redirect: '/home-page' },
    { path: '/home-page', component: HomePage, name: 'Home' },
    { path: '/user-page', component: UserPage, name: 'User Page' },
    { path: '/login', component: LoginForm, name: 'Login' },
    { path: '/register', component: RegisterForm, name: 'Register' },
    { path: '/admin-page', component: AdminPage, name: 'Admin Page' },
    { path: '/search-games', component: SearchGames, meta: { requiresAuth: true } },
    { path: '/add-game', component: AddGameForm, meta: { requiresAuth: true } },
    { path: '/pending-games', component: PendingGamesTable, meta: { requiresAuth: true } },
    { path: '/approved-games', component: ApprovedGamesTable, meta: { requiresAuth: true } },
    { path: '/user-games', component: UserGames, meta: { requiresAuth: true } },
    { path: '/profile-page', component: ProfilePage, meta: { requiresAuth: true } },
    { path: '/profile-details', component: ProfileDetailsForm, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

function isTokenValid(token) {
    try {
        const exp  = jwtDecode(token);
        return Date.now() <= exp.exp * 1000;
    } catch {
        return false;
    }
}

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = token && isTokenValid(token);

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});


export default router;

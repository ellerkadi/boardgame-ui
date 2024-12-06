import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import store from './store';
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.use(router);  // Use the router
app.use(store);
app.mount('#app');

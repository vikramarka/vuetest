import { createRouter, createWebHistory } from 'vue-router';
import login from './login.vue';
import signup from './signup.vue';
import dashboard from './dashboard.vue';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: login,
    },
    {
      path: '/signup',
      component: signup,
    },
    {
      path: '/dashboard',
      component: dashboard,
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import login from './login.vue';
import signup from './signup.vue';
import dashboard from './dashboard.vue';
import { getLoggedInUser } from '../services/user';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        protected: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  var user = getLoggedInUser();
  console.log(user);
  //if the route is protected navigate to login page
  if (to.meta.protected && !user) {
    console.log('lllll');
    next({ name: '/' });
  } else if ((to.name == 'home' || to.name == 'signup') && user) {
    console.log('lllll');
    //if the user is already logged in and trying to access home page or signup redirect to dashboard
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;

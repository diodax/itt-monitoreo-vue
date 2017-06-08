import Vue from 'vue';
import Router from 'vue-router';
//import Hello from '@/components/Home'

import Login from './../pages/Login';
import Dashboard from './../pages/Dashboard';
import Setting from './../pages/Setting';
// User
import User from './../pages/users/User';
import UserList from './../pages/users/UserList';
import UserNew from './../pages/users/UserNew';

Vue.use(Router);

export default new Router({
  hashbang: false,
  history: true,
  linkActiveClass: 'active',
  //mode: 'html5',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    {
      path: '/settings',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      subRoutes: {
        '/list': {
          component: UserList,
        },
        '/new': {
          component: UserNew,
        },
      }
    },
  ]
});

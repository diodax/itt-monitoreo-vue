import Vue from 'vue';
import Router from 'vue-router';
//import Hello from '@/components/Home'

import LoginTemplate from './../pages/Login';
import DashTemplate from './../pages/Dash';
import NotFoundTemplate from './../pages/NotFound';


import Dashboard from './../pages/Dashboard';
import Setting from './../pages/Setting';
// User
import User from './../pages/users/User';
import CreateUser from './../pages/users/CreateUser';
import UserList from './../pages/users/UserList';
import UserNew from './../pages/users/UserNew';

// Appointment
import AppointmentList from './../pages/appointments/AppointmentList';
import AppointmentAdd from './../pages/appointments/AppointmentAdd';
import AppointmentEdit from './../pages/appointments/AppointmentEdit';

Vue.use(Router);

export default new Router({
  hashbang: false,
  history: true,
  linkActiveClass: 'active',
  //mode: 'html5',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginTemplate,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'Dash',
      component: DashTemplate,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          name: 'Setting',
          component: Setting,
          meta: { requiresAuth: true }
        },
        // User CRUD routes
        {
          path: 'user',
          name: 'User',
          component: User,
          meta: { requiresAuth: true },
          subRoutes: {
            'list': {
              component: UserList,
              meta: { requiresAuth: true }
            },
            'new': {
              component: UserNew,
              meta: { requiresAuth: true }
            },
          }
        },

        {
          path: 'user/create',
          name: 'CreateUser',
          component: CreateUser,
          meta: { requiresAuth: true }
        },

        // End of User CRUD routes

        // Appointment CRUD routes

        {
          path: 'appointment',
          name: 'AppointmentList',
          component: AppointmentList,
          meta: { requiresAuth: true }
        },

        {
          path: 'appointment/add',
          name: 'AppointmentAdd',
          component: AppointmentAdd,
          meta: { requiresAuth: true }
        },

        {
          path: 'appointment/:id',
          name: 'AppointmentEdit',
          component: AppointmentEdit,
          meta: { requiresAuth: true }
        },

        // End of Appointment CRUD routes
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFoundTemplate,
      meta: { requiresAuth: false }
    },
  ]
});

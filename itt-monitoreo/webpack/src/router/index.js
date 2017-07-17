import Vue from 'vue';
import Router from 'vue-router';

import LoginTemplate from '@/pages/Login';
import DashTemplate from '@/pages/Dash';
import NotFoundTemplate from '@/pages/NotFound';

import Dashboard from '@/pages/Dashboard';
import Setting from '@/pages/Setting';

// User
import UserList from '@/pages/users/UserList';
import UserAdd from '@/pages/users/UserAdd';
import UserEdit from '@/pages/users/UserEdit';

// Appointment
import AppointmentList from '@/pages/appointments/AppointmentList';
import AppointmentAdd from '@/pages/appointments/AppointmentAdd';
import AppointmentEdit from '@/pages/appointments/AppointmentEdit';

// Doctor
import DoctorAppointmentList from '@/pages/doctor/DoctorAppointmentList';

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
          name: 'UserList',
          component: UserList,
          meta: { requiresAuth: true },
        },

        {
          path: 'user/add',
          name: 'UserAdd',
          component: UserAdd,
          meta: { requiresAuth: true }
        },

        {
          path: 'user/:id',
          name: 'UserEdit',
          component: UserEdit,
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

        // Doctor-specific routes

        {
          path: 'doctor/:id/appointment',
          name: 'DoctorAppointmentList',
          component: DoctorAppointmentList,
          meta: { requiresAuth: true }
        },

        // End of Doctor-specific routes

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

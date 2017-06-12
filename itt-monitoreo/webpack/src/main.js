// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';
import auth from './services/auth';

Vue.config.productionTip = false;
Vue.use(VueResource);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.loggenIn()) {
    next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
  } else {
    next();
  }
});

// router.beforeEach(function (transition) {
//   if (transition.to.auth && ! localStorage.getItem('user')) {
//     transition.redirect('/login');
//   } else {
//     transition.next();
//   }
// });

//router.start(App, 'body');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

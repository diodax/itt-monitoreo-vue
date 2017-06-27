// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';
import auth from './services/auth';
import TableComponent from 'vue-table-component';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(TableComponent);  //TODO: Deprecate dis
Vue.use(VeeValidate);

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

//router.start(App, 'body');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

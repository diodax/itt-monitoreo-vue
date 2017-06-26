// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';
import auth from './services/auth';
import TableComponent from 'vue-table-component';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n'; //needed for calendar locale
import {messages} from 'vue-bootstrap-calendar'; // you can include your own translation here if you want!

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(TableComponent);  //TODO: Deprecate dis
Vue.use(VeeValidate);
Vue.use(VueI18n);

window.i18n = new VueI18n({
    locale: 'en',
    messages
});

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
  i18n,
  router,
  template: '<App/>',
  components: { App }
});

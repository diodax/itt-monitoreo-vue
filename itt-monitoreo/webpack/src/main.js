// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';
import auth from './services/auth';
import TableComponent from 'vue-table-component';
import VeeValidate from 'vee-validate';
import VueNotifications from 'vue-notifications';
import miniToastr from 'mini-toastr';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(TableComponent);  //TODO: Deprecate dis
Vue.use(VeeValidate);

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
};

miniToastr.init({types: toastTypes});

// Here we setup messages output to `mini-toastr`
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb);
}

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our output to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

// Activate plugin
Vue.use(VueNotifications, options);  // VueNotifications have auto install but if we want to specify options we've got to do it manually.

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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VueResource);

// router.beforeEach((transition) => {
//   console.log(transition);
//   if (transition.to.auth) {
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

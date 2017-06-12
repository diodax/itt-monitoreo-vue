<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from './services/auth';
import router from './router/index';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
    logout () {
      auth.logout();
      //router.go('/login');
      router.push('/login');
    }
  },
  replace: false,
};
</script>

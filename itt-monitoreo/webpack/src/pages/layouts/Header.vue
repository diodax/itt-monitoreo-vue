<template>
  <header class="main-header">
    <!-- Logo -->

      <router-link class="logo" to="/">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>A</b>LTE</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Admin LTE</b></span>
      </router-link>
      <!-- <a v-link="{ path: '/' }" class="logo"></a> -->

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img v-bind:src="user.gravatarUrl" class="user-image" alt="User Image">
              <span class="hidden-xs">{{user.firstName + ' ' + user.lastName}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img v-bind:src="user.gravatarUrl" class="img-circle" alt="User Image">

                <p>
                  {{user.firstName + ' ' + user.lastName}} - <span class="first-letter">{{getRoles(user)}}</span>
                  <small>Member since {{ moment(user.createdAt).format('MMMM YYYY') }}</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <!-- <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div> -->
                <div>
                  <a v-on:click="logout()" class="btn btn-default btn-flat btn-block">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import auth from '../../services/auth';
  import moment from 'moment';

  export default {
    name: 'Header',
    data() {
      return {
        user: {},
      };
    },
    methods: {
      logout() { return this.$root.$options.components.App.methods.logout(); },
      moment() { return moment(); },
      getRoles(user) {
        var names = [];
        if (typeof user.roles !== 'undefined') {
          names = user.roles.map(function(x) {
            return x.name;
          });
        }
        return names.join(", ");
      },
    },
    created() {
      let self = this;
      auth.getUserInfo().then(function(data) {
          self.user = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  };
</script>
<style>
.first-letter {
    text-transform:capitalize;
}
</style>

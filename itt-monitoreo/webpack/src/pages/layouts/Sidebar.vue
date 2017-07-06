<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img v-bind:src="user.gravatarUrl" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{user.firstName + ' ' + user.lastName}}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <li class="active treeview" v-for="row in menus">

          <router-link :to="{ path: row.link }">
            <i class="fa" :class="row.icon"></i>
            <span>{{ row.name }}</span>
          </router-link>

          <!-- <a v-link="{ path: row.link }">
            <i class="fa" :class="row.icon"></i>
            <span>{{ row.name }}</span>
          </a> -->

          <ul v-show="row.hasOwnProperty('child') && typeof row.child.length != 'undefined'" class="treeview-menu">
            <li v-for="child in row.child">
              <!-- <a v-link="{ path: child.link }">
                <i class="fa" :class="child.icon"></i> {{ child.name }}
              </a> -->
              <router-link :to="{ path: child.link }">
                <i class="fa" :class="child.icon"></i> {{ child.name }}
              </router-link>
            </li>
          </ul>

        </li>

      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  import auth from '../../services/auth';

  export default {
    name: 'Sidebar',
    data() {
      return {
        menus: this.$parent.$data.menus || [],
        user: {},
      };
    },
    ready() {
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

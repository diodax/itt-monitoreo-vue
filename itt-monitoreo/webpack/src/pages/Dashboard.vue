<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1> {{ title }} </h1>
      <ol class="breadcrumb">
        <li class="active">
          <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
        </li>s
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Admin elements -->
      <!-- Doctor elements -->
      <!-- Patient elements -->
      <!-- Relative elements -->

    </section>

  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
      };
    },
    route: {
      activate(t) {
        this.$parent.$data.title = 'Dashboard';
        t.next();
      },
    },
  };
</script>

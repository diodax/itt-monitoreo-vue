<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li><router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
      <li><router-link :to="{ path: '/appointment' }">Appointments</router-link></li>
      <li class="active">Edit</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Appointment Form -->
    <div class="row">
      <div class="col-xs-12"></div>
    </div>
    <!-- End of Appointment Form -->
  </section>
</div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'AppointmentEdit',
  data() {
    return {
      id: this.$route.params.id,
      title: 'Edit Appointment',
      model: {},
    };
  },
  created() {
    let self = this;
    api.get('/appointment/' + self.id).then(function(response) {
        self.model = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
}
</script>

<style>
</style>

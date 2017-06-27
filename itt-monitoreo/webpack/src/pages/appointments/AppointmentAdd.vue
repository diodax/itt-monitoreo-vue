<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li><router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
      <li><router-link :to="{ path: '/appointment' }">Appointments</router-link></li>
      <li class="active">New</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Appointment Form -->
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-list-alt"></i> Form</h3>
          </div>
          <form class="form-horizontal" name="form">
            <div class="box-body"></div>
          </form>
        </div>

      </div>
    </div>
    <!-- End of Appointment Form -->
  </section>
</div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'AppointmentAdd',
  data() {
    return {
      title: 'New Appointment',
      model: {},
    };
  },
  created() {},
}
</script>

<style>
</style>

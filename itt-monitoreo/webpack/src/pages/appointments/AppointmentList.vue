<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
      </li>
      <li class="active">Appointments</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Table Panel-->
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-edit"></i> Appointments</h3>
          </div>
          <div class="box-body table-responsive">
            <router-link :to="{ path: '/appointment/add' }" class="btn btn-primary">
              New &nbsp; <span clsass="fa fa-plus" aria-hidden="true"></span>
            </router-link>
            <table class="table table-condensed table-bordered table-striped table-hover">
              <thead>
                <tr role="row">
                  <th style="width: 1px;">#</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th style="white-space: nowrap !important;"></th>
                </tr>
              </thead>
              <tbody>
                <tr role="row" v-for="(row, index) in list">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.doctor.username }}</td>
                  <td>{{ row.patient.username }}</td>
                  <td>{{ row.date }}</td>
                  <td style="width: 1%; white-space: nowrap !important; text-align: right;">
                    <router-link :to="{ path: '/appointment/' + row.id }" class='btn btn-default'>Edit</router-link>
                    <a class='btn btn-danger'>Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Table Panel-->

    <!-- Calendar of Appointments -->
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-edit"></i> Calendar</h3>
          </div>
          <div class="box-body">
            <calendar :first-day="0" :all-events="events"></calendar>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Calendar of Appointments -->
  </section>
</div>
</template>

<script>
import api from '../../services/api';
import {
  Calendar
} from 'vue-bootstrap-calendar';

export default {
  name: 'AppointmentList',
  data() {
    return {
      title: 'List of Appointments',
      list: [],
      events: [],
    };
  },
  components: {
    Calendar
  },
  created() {
    let scope = this;
    api.get('/appointment?populate=[doctor,patient]').then(function(response) {
        scope.list = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
}
</script>

<style>
@import url('/static/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>

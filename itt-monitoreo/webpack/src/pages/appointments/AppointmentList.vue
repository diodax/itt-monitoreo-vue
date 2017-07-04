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
                  <th>Appointed Date</th>
                  <th style="white-space: nowrap !important;"></th>
                </tr>
              </thead>
              <tbody>
                <tr role="row" v-for="(row, index) in list">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.doctor.firstName + ' ' + row.doctor.lastName + ' (' + row.doctor.username + ')' }}</td>
                  <td>{{ row.patient.firstName + ' ' + row.patient.lastName + ' (' + row.patient.username + ')' }}</td>
                  <td>{{ formatDate(row.startDate) }}</td>
                  <td style="width: 1%; white-space: nowrap !important; text-align: right;">
                    <router-link :to="{ path: '/appointment/' + row.id }" class='btn btn-default'>Edit</router-link>
                    <a class='btn btn-danger'>Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Loading (remove the following to stop the loading)-->
          <div v-if="loadingTable" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>
        </div>
      </div>
    </div>
    <!-- End of Table Panel-->

    <!-- Calendar of Appointments -->
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-calendar-plus-o"></i> Calendar</h3>
          </div>
          <div class="box-body no-padding">
            <calendar v-if="!loadingEvents" :events="events" :editable="true"></calendar>
          </div>
          <!-- Loading (remove the following to stop the loading)-->
          <div v-if="loadingEvents" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>
        </div>
      </div>
    </div>
    <!-- End of Calendar of Appointments -->
  </section>
</div>
</template>

<script>
import api from '../../services/api';
import Calendar from '../../components/Calendar';
import {formatDate} from '../../services/filters';

export default {
  name: 'AppointmentList',
  data() {
    return {
      title: 'List of Appointments',
      list: [],
      events: [],
      loadingEvents: true,
      loadingTable: true,
    };
  },
  components: {
    Calendar
  },
  methods: {
    formatDate
  },
  created() {
    let self = this;
    api.get('/appointment?populate=[doctor,patient]').then(function(response) {
        self.list = response.data;
        self.loadingTable = false;
      })
      .catch(function(error) {
        console.log(error);
      });

    api.get('/event').then(function(response) {
        self.events = response.data;
        self.loadingEvents = false;
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

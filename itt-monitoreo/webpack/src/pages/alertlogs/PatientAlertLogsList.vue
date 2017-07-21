<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
      </li>
      <li class="active">Alert Logs</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Table Panel-->
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-warning"></i> Alert Logs</h3>
          </div>
          <div class="box-body table-responsive">
            <table class="table table-condensed table-bordered table-striped table-hover">
              <thead>
                <tr role="row">
                  <th style="width: 1px;">#</th>
                  <th>Patient</th>
                  <th>BPM</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr role="row" v-for="(row, index) in list">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.patient.firstName + ' ' + row.patient.lastName }}</td>
                  <td>{{ row.bpm }}</td>
                  <td>{{ formatDate(row.createdAt) }}</td>
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
  </section>
</div>
</template>

<script>
import api from '@/services/api';
import {formatDate} from '@/services/filters';
import router from '@/router/index';

export default {
  name: 'PatientAlertLogList',
  data() {
    return {
      id: this.$route.params.id,
      title: 'Alert Logs',
      list: [],
      loadingTable: true,
    };
  },
  methods: {
    formatDate,
  },
  created() {
    let self = this;
    api.get('/alertlog?patient=' + self.id + '&populate=[patient]').then(function(response) {
        self.list = response.data;
        self.loadingTable = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
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

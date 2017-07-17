<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li class="active">
        <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
      </li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">

    <!-- Admin elements -->
    <div v-if="isRole('admin')">

      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>150</h3>

              <p>Active Doctors</p>
            </div>
            <div class="icon">
              <i class="ion-ios-medkit"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>53</h3>

              <p>Registered Patients</p>
            </div>
            <div class="icon">
              <i class="ion ion-person"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>44</h3>

              <p>Assigned Relatives</p>
            </div>
            <div class="icon">
              <i class="ion-ios-people"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>1</h3>

              <p>Installed Devices</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->

    </div>
    <!-- Doctor elements -->
    <div v-if="isRole('doctor')">

      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-6 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>{{boxes.assignedPatients}}</h3>

              <p>Assigned Patients</p>
            </div>
            <div class="icon">
              <i class="ion-ios-person"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-6 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{boxes.pendingAppointments}}</h3>

              <p>Pending Appointments</p>
            </div>
            <div class="icon">
              <i class="ion ion-ios-calendar"></i>
            </div>
            <router-link :to="{ path: '/doctor/' + user.id + '/appointment' }" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></router-link>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->

      <div class="row">
        <!-- Left col -->
        <section class="col-lg-7">

          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">Status Report</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                    <tr role="row">
                      <th style="width: 1px;">#</th>
                      <th>Patient</th>
                      <th>Insurance Company</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in patients">
                      <td>{{ index + 1 }}</td>
                      <td>{{ row.firstName + ' ' + row.lastName }}</td>
                      <td>{{ row.insuranceCompany }}</td>
                      <td>
                        <span class="label"
                              :class="{ 'label-success': row.status === 'stable', 'label-danger': row.status === 'critical', 'label-default': row.status === 'offline' }">{{ row.status }}</span>
                      </td>

                    </tr>

                  </tbody>
                </table>
              </div>
              <!-- /.table-responsive -->
              <!-- Loading (remove the following to stop the loading)-->
              <div v-if="loadingStatusTable" class="overlay"><i class="fa fa-refresh fa-spin"></i></div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

        </section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        <section class="col-lg-5">

          <!-- Calendar -->
          <div class="box box-solid bg-green-gradient">
            <div class="box-header">
              <i class="fa fa-calendar"></i>

              <h3 class="box-title">Calendar</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <!-- button with a dropdown -->
                <div class="btn-group">
                  <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                      <i class="fa fa-bars"></i></button>
                  <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="#">Add new event</a></li>
                    <li><a href="#">Clear events</a></li>
                    <li class="divider"></li>
                    <li><a href="#">View calendar</a></li>
                  </ul>
                </div>
                <button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                <button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
                  </button>
              </div>
              <!-- /. tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <!--The calendar -->
              <div class="calendar-dashboard" style="width: 100%" v-datepicker></div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer text-black">
              <div class="row">
                <div class="col-sm-6">
                  <!-- Progress bars -->
                  <div class="clearfix">
                    <span class="pull-left">Task #1</span>
                    <small class="pull-right">90%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 90%;"></div>
                  </div>

                  <div class="clearfix">
                    <span class="pull-left">Task #2</span>
                    <small class="pull-right">70%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 70%;"></div>
                  </div>
                </div>
                <!-- /.col -->
                <div class="col-sm-6">
                  <div class="clearfix">
                    <span class="pull-left">Task #3</span>
                    <small class="pull-right">60%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 60%;"></div>
                  </div>

                  <div class="clearfix">
                    <span class="pull-left">Task #4</span>
                    <small class="pull-right">40%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 40%;"></div>
                  </div>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
          </div>
          <!-- /.box -->

        </section>
        <!-- right col -->
      </div>

    </div>
    <!-- Patient elements -->
    <div v-if="isRole('patient')">

      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>2</h3>

              <p>Sheduled Appointments</p>
            </div>
            <div class="icon">
              <i class="ion ion-ios-calendar"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>90<sup style="font-size: 20px;">%</sup></h3>

              <p>Measurement Uptime</p>
            </div>
            <div class="icon">
              <i class="ion ion-ios-speedometer"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>2</h3>

              <p>Assigned Relatives</p>
            </div>
            <div class="icon">
              <i class="ion-ios-people"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>1</h3>

              <p>Alerts this Month</p>
            </div>
            <div class="icon">
              <i class="ion ion-ios-pulse-strong"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->

      <div class="row">
        <!-- Left col -->
        <section class="col-lg-7">

          <!-- Custom tabs (Charts with tabs)-->
          <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right">
              <li class="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
              <!-- <li><a href="#sales-chart" data-toggle="tab">Donut</a></li> -->
              <li class="pull-left header"><i class="fa fa-area-chart"></i> Sensor Readings</li>
            </ul>
            <div class="tab-content no-padding">
              <!-- Morris chart - Sales -->
              <div class="chart tab-pane active" id="revenue-chart" style="position: relative;">
                <line-chart :chart-data="datacollection" :height="200"></line-chart>
              </div>
              <!-- <div class="chart tab-pane" id="sales-chart" style="position: relative;"></div> -->
            </div>
          </div>
          <!-- /.nav-tabs-custom -->

        </section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        <section class="col-lg-5">

          <!-- Calendar -->
          <div class="box box-solid bg-green-gradient">
            <div class="box-header">
              <i class="fa fa-calendar"></i>

              <h3 class="box-title">Calendar</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <!-- button with a dropdown -->
                <div class="btn-group">
                  <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                      <i class="fa fa-bars"></i></button>
                  <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="#">Add new event</a></li>
                    <li><a href="#">Clear events</a></li>
                    <li class="divider"></li>
                    <li><a href="#">View calendar</a></li>
                  </ul>
                </div>
                <button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                <button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
                  </button>
              </div>
              <!-- /. tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <!--The calendar -->
              <div class="calendar-dashboard" style="width: 100%" v-datepicker></div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer text-black">
              <div class="row">
                <div class="col-sm-6">
                  <!-- Progress bars -->
                  <div class="clearfix">
                    <span class="pull-left">Task #1</span>
                    <small class="pull-right">90%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 90%;"></div>
                  </div>

                  <div class="clearfix">
                    <span class="pull-left">Task #2</span>
                    <small class="pull-right">70%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 70%;"></div>
                  </div>
                </div>
                <!-- /.col -->
                <div class="col-sm-6">
                  <div class="clearfix">
                    <span class="pull-left">Task #3</span>
                    <small class="pull-right">60%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 60%;"></div>
                  </div>

                  <div class="clearfix">
                    <span class="pull-left">Task #4</span>
                    <small class="pull-right">40%</small>
                  </div>
                  <div class="progress xs">
                    <div class="progress-bar progress-bar-green" style="width: 40%;"></div>
                  </div>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
          </div>
          <!-- /.box -->

        </section>
        <!-- right col -->
      </div>

    </div>
    <!-- Relative elements -->

  </section>

</div>
</template>

<script>
import $ from 'jquery';
import '../../static/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import auth from '../services/auth';
import LineChart from '@/components/LineChart';
import Datepicker from '@/directives/Datepicker';
import api from '@/services/api';

export default {
  name: 'Dashboard',
  data() {
    return {
      title: 'Dashboard',
      user: {},
      datacollection: {},
      updateInterval: 500,  // fetch data over x milliseconds
      boxes: {
        assignedPatients: 0,
        pendingAppointments: 0
      },
      loadingStatusTable: true,
      patients: [],
    };
  },
  components: {
    LineChart
  },
  directives: {
    Datepicker,
  },
  methods: {
    isRole(role) {
      if (this.user.roles) {
        var found = this.user.roles.some(function (el) {
          return el.name === role;
        });
        if (found) { return true; } else { return false; }
      } else {
        return false;
      }
    },
    fillData() {
      let self = this;
      api.get('/bucket?username=' + this.user.username + '&secs=100').then(function(response) {
          let results = response.data;
          let dateresult = results.map(a => a.timestamp);
          let bpmresult = results.map(a => a.bpm);
          self.datacollection = {
            labels: dateresult,
            datasets: [
              {
                label: 'Beats Per Minute (BPM)',
                backgroundColor: '#5bf8bf', //greenish     //'#f87979', //reddish
                data: bpmresult
              }
            ]
          };

          setTimeout(function() {
            console.log('Calling fillData()...')
            self.fillData();
          }, self.updateInterval);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPendingAppointments(userId) {
      let self = this;
      api.get('doctor/' + userId + '/appointment').then(function(response) {
          self.boxes.pendingAppointments = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAssignedPatients(userId) {
      let self = this;
      api.get('doctor/' + userId + '/patient').then(function(response) {
          self.boxes.assignedPatients = response.data.length;
          self.loadingStatusTable = false;
          self.patients = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created() {
    let self = this;
    auth.getUserInfo().then(function(data) {
        self.user = data;
        if (self.isRole('doctor')) {
          self.getPendingAppointments(self.user.id);
          self.getAssignedPatients(self.user.id);
        }

        setTimeout(function() {
          console.log('Calling fillData()...')
          self.fillData();
        }, self.updateInterval);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
</script>
<style src="../../static/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css"></style>
<!-- Theme style -->
<style src="../../static/adminLte/css/AdminLTE.min.css"></style>
<style>
.box .datepicker-inline,
.box .datepicker-inline .datepicker-days,
.box .datepicker-inline>table,
.box .datepicker-inline .datepicker-days>table {
  width: 100%;
}
</style>

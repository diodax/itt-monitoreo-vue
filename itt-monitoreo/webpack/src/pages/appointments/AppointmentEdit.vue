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
      <div class="col-xs-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-list-alt"></i> Form</h3>
          </div>
          <form class="form-horizontal" name="form" @submit.prevent="submitForm()">
            <div class="box-body">
              <!-- Inputs block -->

              <div class="form-group">
                <label for="doctor" class="col-sm-2 control-label">Doctor</label>
                <div class="col-sm-8">
                  <select class="form-control" id="doctor" name="doctor" v-model="model.doctor" v-validate="'required'">
                    <option v-for="item in doctors" v-bind:value="item.value">
                      <p class="lead">{{ item.text }}</p>
                      <p class="text-muted">({{ item.subtext }})</p>
                    </option>
                  </select>
                  <span class="text-danger" v-show="errors.has('doctor')">{{ errors.first('doctor') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="patient" class="col-sm-2 control-label">Patient</label>
                <div class="col-sm-8">
                  <select class="form-control" id="patient" name="patient" v-model="model.patient" v-validate="'required'">
                    <option v-for="item in patients" v-bind:value="item.value">
                      <p class="lead">{{ item.text }}</p>
                      <p class="text-muted">({{ item.subtext }})</p>
                    </option>
                  </select>
                  <span class="text-danger" v-show="errors.has('patient')">{{ errors.first('patient') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="startDate" class="col-sm-2 control-label">Start Date</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="startDate" name="startDate" v-model="model.startDate" v-validate="'required'">
                  <span class="text-danger" v-show="errors.has('startDate')">{{ errors.first('startDate') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="endDate" class="col-sm-2 control-label">End Date</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="endDate" name="endDate" v-model="model.endDate" v-validate="'required'">
                  <span class="text-danger" v-show="errors.has('endDate')">{{ errors.first('endDate') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="comments" class="col-sm-2 control-label">Comments</label>
                <div class="col-sm-8">
                  <textarea class="form-control" rows="3" id="comments" name="comments" v-model="model.comments"></textarea>
                  <span class="text-danger" v-show="errors.has('comments')">{{ errors.first('comments') }}</span>
                </div>
              </div>

              <!-- End of Inputs block -->
            </div>
            <div class="box-footer">
              <div class="margin pull-right">
                <button type="submit" class="btn btn-info"><i class="fa fa-floppy-o"></i> Save</button>
                <router-link :to="{ path: '/appointment' }" class="btn btn-default" active-class=" ">Cancel</router-link>
              </div>
            </div>
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
import router from '../../router/index';
import moment from 'moment';

export default {
  name: 'AppointmentEdit',
  data() {
    return {
      id: this.$route.params.id,
      title: 'Edit Appointment',
      model: {},
      doctors: [],
      patients: [],
    };
  },
  created() {
    let self = this;
    api.get('/appointment/' + self.id).then(function(response) {
        self.model = response.data;
        self.model.startDate = moment(response.data.startDate).format('YYYY-MM-DD');
        self.model.endDate = moment(response.data.endDate).format('YYYY-MM-DD');
      })
      .catch(function(error) {
        console.log(error);
      });
    api.get('/user').then(function(response) {
        var selectList = response.data.map(function(element) {
           return {
             value: element.id,
             text: element.firstName + ' ' + element.lastName,
             subtext: element.email
           };
        });
        self.doctors = selectList;
        self.patients = selectList;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    submitForm () {
      let self = this;
      self.model.startDate = moment(self.model.startDate).format('YYYY-MM-DDTHH:mm:ss');
      self.model.endDate = moment(self.model.endDate).format('YYYY-MM-DDTHH:mm:ss');
      api.put('/appointment/' + self.id, self.model).then(function(response) {
        console.log(response);
        router.push('/appointment');
        self.showEditSuccess();
      })
      .catch(function(error) {
        console.log(error);
        self.showEditError();
      });
    }
  },
  notifications: {
    showEditSuccess: {
      title: 'Edit Succesful',
      message: 'Appointment edit complete',
      type: 'success' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    showEditError: {
      title: 'Edit Failed',
      message: 'Failed to edit appointment',
      type: 'error' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
  },
}
</script>

<style>
</style>

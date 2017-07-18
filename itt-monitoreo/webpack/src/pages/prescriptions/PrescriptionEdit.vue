<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li><router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link></li>
      <li><router-link :to="{ path: '/prescription' }">Prescriptions</router-link></li>
      <li class="active">Edit</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Prescription Form -->
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
                <label for="date" class="col-sm-2 control-label">Date</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="date" name="date" v-model="model.date" v-validate="'required'">
                  <span class="text-danger" v-show="errors.has('date')">{{ errors.first('date') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="caseHistory" class="col-sm-2 control-label">Symptons History</label>
                <div class="col-sm-8">
                  <textarea class="form-control" rows="3" id="caseHistory" name="caseHistory" v-model="model.caseHistory"></textarea>
                  <span class="text-danger" v-show="errors.has('caseHistory')">{{ errors.first('caseHistory') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="medication" class="col-sm-2 control-label">Medication</label>
                <div class="col-sm-8">
                  <textarea class="form-control" rows="3" id="medication" name="medication" v-model="model.medication"></textarea>
                  <span class="text-danger" v-show="errors.has('medication')">{{ errors.first('medication') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="notes" class="col-sm-2 control-label">Extra Notes</label>
                <div class="col-sm-8">
                  <textarea class="form-control" rows="3" id="notes" name="notes" v-model="model.notes"></textarea>
                  <span class="text-danger" v-show="errors.has('notes')">{{ errors.first('notes') }}</span>
                </div>
              </div>

              <!-- End of Inputs block -->
            </div>
            <div class="box-footer">
              <div class="margin pull-right">
                <button type="submit" class="btn btn-info"><i class="fa fa-floppy-o"></i> Save</button>
                <router-link :to="{ path: '/prescription' }" class="btn btn-default" active-class=" ">Cancel</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End of Prescription Form -->
  </section>
</div>
</template>

<script>
import api from '@/services/api';
import router from '@/router/index';
import moment from 'moment';

export default {
  name: 'PrescriptionEdit',
  data() {
    return {
      id: this.$route.params.id,
      title: 'Edit Prescription',
      model: {},
      doctors: [],
      patients: [],
    };
  },
  created() {
    let self = this;
    api.get('/prescription/' + self.id).then(function(response) {
        self.model = response.data;
        self.model.date = moment(response.data.date).format('YYYY-MM-DD');
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
      self.model.date = moment(self.model.date).format('YYYY-MM-DDTHH:mm:ss');
      api.put('/prescription/' + self.id, self.model).then(function(response) {
        console.log(response);
        router.push('/prescription');
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
      message: 'Prescription edit complete',
      type: 'success' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    showEditError: {
      title: 'Edit Failed',
      message: 'Failed to edit prescription',
      type: 'error' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
  },
}
</script>

<style>
</style>

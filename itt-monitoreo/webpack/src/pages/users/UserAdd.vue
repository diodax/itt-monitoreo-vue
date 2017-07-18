<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/user' }">Users</router-link>
      </li>
      <li class="active">Edit</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- User Form -->
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
                <label for="firstName" class="col-sm-2 control-label">First Name</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="firstName" name="firstName" v-model="model.firstName" v-validate="'required'">
                  <span class="text-danger" v-show="errors.has('firstName')">{{ errors.first('firstName') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="lastName" class="col-sm-2 control-label">Last Name</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="lastName" name="lastName" v-model="model.lastName" v-validate="'required'">
                  <span class="text-danger" v-show="errors.has('lastName')">{{ errors.first('lastName') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-8">
                  <input type="email" class="form-control" id="email" name="email" v-model="model.email" v-validate="'required|email'">
                  <span class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="password" v-model="model.password">
                  <span class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="birthDate" class="col-sm-2 control-label">Birthday</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="birthDate" v-model="model.birthDate">
                  <span class="text-danger" v-show="errors.has('birthDate')">{{ errors.first('birthDate') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="phoneNumbers" class="col-sm-2 control-label">Phone Number</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="phoneNumbers" name="phoneNumbers" v-model="model.phoneNumbers">
                  <span class="text-danger" v-show="errors.has('phoneNumbers')">{{ errors.first('phoneNumbers') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="addresses" class="col-sm-2 control-label">Address</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="addresses" name="addresses" v-model="model.addresses">
                  <span class="text-danger" v-show="errors.has('addresses')">{{ errors.first('addresses') }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="roles" class="col-sm-2 control-label">Roles</label>
                <div class="col-sm-8">
                  <v-select id="roles" name="roles" multiple :value.sync="selectedRoles" :options="roles" v-validate="'required'"></v-select>
                  <span class="text-danger" v-show="errors.has('roles')">{{ errors.first('roles') }}</span>
                </div>
              </div>

              <template v-if="isRole('doctor')">

                <div class="form-group">
                  <label for="title" class="col-sm-2 control-label">Title</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="title" name="title" v-model="model.title">
                    <span class="text-danger" v-show="errors.has('title')">{{ errors.first('title') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="employers" class="col-sm-2 control-label">Employer</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="employers" name="employers" v-model="model.employers">
                    <span class="text-danger" v-show="errors.has('employers')">{{ errors.first('employers') }}</span>
                  </div>
                </div>

              </template>

              <template v-if="isRole('patient')">

                <div class="form-group">
                  <label for="insuranceCompany" class="col-sm-2 control-label">Title</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="insuranceCompany" name="insuranceCompany" v-model="model.insuranceCompany">
                    <span class="text-danger" v-show="errors.has('insuranceCompany')">{{ errors.first('insuranceCompany') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="assignedDoctor" class="col-sm-2 control-label">Assigned Doctor</label>
                  <div class="col-sm-8">
                    <select class="form-control" id="assignedDoctor" name="assignedDoctor" v-model="model.assignedDoctor">
                      <option v-for="item in doctors" v-bind:value="item.value">
                        <p class="lead">{{ item.text }}</p>
                        <p class="text-muted">({{ item.subtext }})</p>
                      </option>
                    </select>
                    <span class="text-danger" v-show="errors.has('assignedDoctor')">{{ errors.first('assignedDoctor') }}</span>
                  </div>
                </div>

              </template>

              <template v-if="isRole('relative')">

                <div class="form-group">
                  <label for="assignedPatient" class="col-sm-2 control-label">Assigned Patient</label>
                  <div class="col-sm-8">
                    <select class="form-control" id="assignedPatient" name="assignedPatient" v-model="model.assignedPatient">
                      <option v-for="item in patients" v-bind:value="item.value">
                        <p class="lead">{{ item.text }}</p>
                        <p class="text-muted">({{ item.subtext }})</p>
                      </option>
                    </select>
                    <span class="text-danger" v-show="errors.has('assignedPatient')">{{ errors.first('assignedPatient') }}</span>
                  </div>
                </div>

              </template>

              <!-- End of Inputs block -->
            </div>
            <div class="box-footer">
              <div class="margin pull-right">
                <button type="submit" class="btn btn-info"><i class="fa fa-floppy-o"></i> Save</button>
                <router-link :to="{ path: '/user' }" class="btn btn-default" active-class=" ">Cancel</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End of User Form -->
  </section>
</div>
</template>

<script>
import api from '@/services/api';
import router from '@/router/index';
import vSelect from 'vue-select';
import moment from 'moment';

export default {
  name: 'UserAdd',
  data() {
    return {
      title: 'New User',
      model: {},
      roles: [],
      selectedRoles: [],
      doctors: [],
      patients: [],
    };
  },
  components: {
    vSelect
  },
  created() {
    let self = this;
    api.get('/role').then(function(response) {
        var selectList = response.data.map(function(element) {
          return {
            value: element.id,
            label: element.name
          };
        });
        self.roles = selectList;
      })
      .catch(function(error) {
        console.log(error);
      });
    api.get('/user?populate=[roles]').then(function(response) {
        var selectList = response.data.map(function(element) {
          return {
            value: element.id,
            text: element.firstName + ' ' + element.lastName,
            subtext: element.email
          };
        });
        self.doctors = selectList;
      })
      .catch(function(error) {
        console.log(error);
      });
    api.get('/user?populate=[roles]').then(function(response) {
        var selectList = response.data.map(function(element) {
          return {
            value: element.id,
            text: element.firstName + ' ' + element.lastName,
            subtext: element.email
          };
        });
        self.patients = selectList;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    submitForm() {
      let self = this;
      self.model.birthDate = moment(self.model.birthDate).format('YYYY-MM-DDTHH:mm:ss');
      self.model.roles = self.selectedRoles.map(function(element) {
        return element.value;
      });
      api.post('/register', self.model).then(function(response) {
          console.log(response);
          router.push('/user');
          self.showAddSuccess();
        })
        .catch(function(error) {
          console.log(error);
          self.showAddError();
        });
    },
    isRole(role) {
      if (this.selectedRoles) {
        var found = this.selectedRoles.some(function(el) {
          return el.label === role;
        });
        if (found) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  notifications: {
    showAddSuccess: {
      title: 'Creation Succesful',
      message: 'User creation complete',
      type: 'success' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    showAddError: {
      title: 'Creation Failed',
      message: 'Failed to create user',
      type: 'error' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
  },
};
</script>
<style></style>

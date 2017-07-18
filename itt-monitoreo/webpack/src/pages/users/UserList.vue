<template>
<div>
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> {{ title }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ path: '/dashboard' }"><i class="fa fa-dashboard"></i> Dashboard</router-link>
      </li>
      <li class="active">Users</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- Table Panel-->
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title"> <i class="fa fa-fw fa-users"></i> Users</h3>
          </div>
          <div class="box-body table-responsive">
            <router-link :to="{ path: '/user/add' }" class="btn btn-primary">
              New &nbsp; <span clsass="fa fa-plus" aria-hidden="true"></span>
            </router-link>
            <table class="table table-condensed table-bordered table-striped table-hover">
              <thead>
                <tr role="row">
                  <th style="width: 1px;">#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Created At</th>
                  <th>Roles</th>
                  <th style="white-space: nowrap !important;"></th>
                </tr>
              </thead>
              <tbody>
                <tr role="row" v-for="(row, index) in list">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.username }}</td>
                  <td>{{ row.email }}</td>
                  <td>{{ row.firstName + ' ' + row.lastName }}</td>
                  <td>{{ formatDate(row.createdAt) }}</td>
                  <td>
                    <span v-for="role in row.roles" class="label label-primary">
                      {{ role.name }}
                    </span>
                  </td>
                  <td style="width: 1%; white-space: nowrap !important; text-align: right;">
                    <router-link :to="{ path: '/user/' + row.id }" class='btn btn-default'>Edit</router-link>
                    <a v-on:click="deleteUser(row.id)" class='btn btn-danger'>Delete</a>
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
  </section>
</div>
</template>

<script>
import api from '@/services/api';
import {formatDate} from '@/services/filters';
import router from '@/router/index';

export default {
  name: 'UserList',
  data() {
    return {
      title: 'List of Users',
      list: [],
      loadingTable: true,
    };
  },
  methods: {
    formatDate,
    deleteUser(id) {
      let self = this;
      api.delete('/user/' + id).then(function(response) {
          console.log(response);
          router.go({
              path: router.path,
              query: {
                  t: + new Date()
              }
          });
          self.showDeleteSuccess();
        })
        .catch(function(error) {
          console.log(error);
          self.showDeleteError();
        });
    },
  },
  created() {
    let self = this;
    api.get('/user?populate=[roles]').then(function(response) {
        self.list = response.data;
        self.loadingTable = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  notifications: {
    showDeleteSuccess: {
      title: 'Delete Succesful',
      message: 'User deletion complete',
      type: 'success' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    showDeleteError: {
      title: 'Delete Failed',
      message: 'Failed to delete user',
      type: 'error' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
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

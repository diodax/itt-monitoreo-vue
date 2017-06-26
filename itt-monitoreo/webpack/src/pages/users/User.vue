<template>
<section class="content">
  <div class="row center-block">

    <div class="col-md-12">
      <div class="box">
        <div class="box-header">

          <h3 class="box-title"><i class="fa fa-fw fa-users"></i>Users</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
            <div class="row">
              <div class="col-sm-6">
                <div id="example1_length" class="dataTables_length">

                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 table-responsive">

                <!-- <table-component v-if="!loading" :data="list" :show-filter="false" sort-by="id" sort-order="asc">
                  <table-column show="id" label="#" data-type="numeric" :filterable="false"></table-column>
                  <table-column show="username" label="Username"></table-column>
                  <table-column show="email" label="Email"></table-column>
                  <table-column show="firstName" label="First Name"></table-column>
                  <table-column show="lastName" label="Last Name"></table-column>
                  <table-column show="createdAt" label="Created At" data-type="date:DD/MM/YYYY"></table-column>
                </table-component> -->

                <table class="table table-bordered table-striped dataTable">
                  <thead>
                    <tr role="row">
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Created At</th>
                      <th style="white-space: nowrap !important;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr role="row" v-for="row in list">
                      <td>{{ row.id }}</td>
                      <td>{{ row.username }}</td>
                      <td>{{ row.email }}</td>
                      <td>{{ row.firstName }}</td>
                      <td>{{ row.lastName }}</td>
                      <td>{{ row.createdAt }}</td>
                      <td style="width: 1%; white-space: nowrap !important; text-align: right;">
                        <a class='btn btn-default'>Editar</a>
                        <a class='btn btn-danger'>Eliminar</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import api from '../../services/api';

export default {
  name: 'User',
  data() {
    return {
      list: [],
      //loading: true
    };
  },

  created() {
    var scope = this;
    //console.log(scope);
    api.get('/user').then(function(response) {
        //console.log(response);
        scope.list = response.data;
        //scope.loading = false;
      })
      .catch(function(error) {
        //console.log(error);
      });
  },

  mounted() {
    /*this.$nextTick(() => {
      // NOTE: I deprecated this
      // Had to dive into the DOM because TableComponent doesnt provide me with an
      // easy way to insert these classes correctly. Not pretty but it works
      //$('table').addClass('table table-bordered table-striped dataTable');
      $('table').DataTable();
    })*/
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

<template>
<section class="content">
  <div class="row center-block">
    <div class="col-md-12">

      <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">New User</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal" v-on:submit.prevent="submitForm()" name="form">
              <div class="box-body">



                <div class="form-group">
                  <label for="firstName" class="col-sm-2 control-label">First Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="firstName" name="firstName" v-model="model.firstName" v-validate="'required'">
                    <span class="text-danger" v-show="errors.has('firstName')">{{ errors.first('firstName') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="lastName" class="col-sm-2 control-label">Last Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="lastName" name="lastName" v-model="model.lastName" v-validate="'required'">
                    <span class="text-danger" v-show="errors.has('lastName')">{{ errors.first('lastName') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="col-sm-2 control-label">Email</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" name="email" v-model="model.email" v-validate="'required|email'">
                    <span class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="password" class="col-sm-2 control-label">Password</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" v-model="model.password">
                    <span class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="birthDate" class="col-sm-2 control-label">Birthday</label>
                  <div class="col-sm-10">
                    <input type="date" class="form-control" id="birthDate" v-model="model.birthDate">
                    <span class="text-danger" v-show="errors.has('birthDate')">{{ errors.first('birthDate') }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox"> Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button class="btn btn-default">Cancel</button>
                <button type="submit" class="btn btn-info pull-right">Create</button>
              </div>
              <!-- /.box-footer -->
            </form>
          </div>

    </div>
  </div>
</section>

</template>
<script>
import api from '../../services/api';

export default {
  name: 'CreateUser',
  data() {
    return {
      model: {}
    };
  },

  created() {
    var scope = this;

    // api.get('/user').then(function(response) {
    //     //scope.list = response.data;
    //   })
    //   .catch(function(error) {
    //   });
  },
  methods: {
    submitForm () {
      var scope = this;
      api.post('/register', scope.model).then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });


      //console.log('form submitted');
      //console.log(this.model);
    }
  },

  route: {
    activate(t) {
      this.$parent.$parent.$data.title = 'Create User';
      t.next();
    },
  },
};
</script>
<style></style>

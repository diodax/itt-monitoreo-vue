<template>
<div class="login-box">

  <div class="login-logo">
    <router-link to="/"><b>Admin</b> LTE</router-link>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <form @submit.prevent="login()">
      <div v-if="!success && messages != ''">
        <div class="alert alert-danger">
          <a href="#" class="close" data-dismiss="alert">&times;</a> {{ messages }}
        </div>
      </div>

      <div v-if="success && messages != ''">
        <div class="alert alert-success">
          <a href="#" class="close" data-dismiss="alert">&times;</a> {{ messages }}
        </div>
      </div>

      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email" v-model="identifier">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>

      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" v-model="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>

      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
                <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;"><input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div> Remember Me
              </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>

    </form>
  </div>
</div>
</template>

<script>
import auth from '../services/auth';
import router from '../router/index';

export default {
  name: 'Login',
  data() {
    return {
      identifier: '',
      password: '',

      error: '',
      messages: '',
      success: false,
      body_class: 'hold-transition login-page',
    };
  },
  methods: {
    login() {
      let self = this;
      var credentials = {
        identifier: this.identifier,
        password: this.password
      };
      auth.login(credentials).then(function(res){
        router.push('/dashboard');
        self.showLoginSucces();
      }).catch(function(err){
        console.log(err);
        self.showLoginError();
      });
    },
  },
  notifications: {
    showLoginSucces: {
      title: 'Login Succesful',
      message: 'Authentication complete',
      type: 'info' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    showLoginError: {
      title: 'Login Failed',
      message: 'Failed to authenticate',
      type: 'error' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
  },
};
</script>

<style src="../../static/bootstrap/css/bootstrap.min.css"></style>
<!-- jvectormap -->
<style src="../../static/plugins/jvectormap/jquery-jvectormap-1.2.2.css"></style>
<!-- Bootstrap Datepicker -->
<style src="../assets/css/bootstrap-datepicker.min.css"></style>
<!-- Bootstrap Theme -->
<!-- <style src="./assets/css/bootstrap-theme.css"></style> -->
<!-- Theme style -->
<style src="../../static/adminLte/css/AdminLTE.min.css"></style>
<!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
<style src="../../static/adminLte/css/skins/_all-skins.min.css"></style>

<template>
  <div id="app">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-content :title="title"></app-content>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './pages/layouts/Header';
import AppSidebar from './pages/layouts/Sidebar';
import AppContent from './pages/layouts/Content';
import AppFooter from './pages/layouts/Footer';
import Menus from './../config/menus';

export default {
  name: 'App',
  data() {
    return {
      login: true,
      title: null,
      menus: Menus,
    };
  },
  replace: false,
  components: {
    AppHeader,
    AppSidebar,
    AppContent,
    AppFooter,
  },
};
</script>

<style src="../static/bootstrap/css/bootstrap.min.css"></style>
<!-- jvectormap -->
<style src="../static/plugins/jvectormap/jquery-jvectormap-1.2.2.css"></style>
<!-- Bootstrap Datepicker -->
<style src="./assets/css/bootstrap-datepicker.min.css"></style>
<!-- Bootstrap Theme -->
<!-- <style src="./assets/css/bootstrap-theme.css"></style> -->
<!-- Theme style -->
<style src="../static/adminLte/css/AdminLTE.min.css"></style>
<!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
<style src="../static/adminLte/css/skins/_all-skins.min.css"></style>

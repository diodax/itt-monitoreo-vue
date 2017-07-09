import Vue from 'vue';
import $ from 'jquery';

export default {
  bind: function(el) {
    $(el).datepicker();
  }
};

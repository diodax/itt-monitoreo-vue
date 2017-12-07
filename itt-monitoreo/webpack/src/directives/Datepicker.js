import Vue from 'vue';
import $ from 'jquery';

//Note: This doesn't really work. Future me, you should use a component instead (check the DateRangePicker example).

export default {
  bind: function(el) {
    $(el).datepicker();
  }
};

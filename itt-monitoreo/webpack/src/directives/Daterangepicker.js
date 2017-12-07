import Vue from 'vue';
import $ from 'jquery';

//Note: This doesn't really work. Future me, you should use a component instead (check the DateRangePicker example).

export default {
  bind: function(el, binding, vnode) {
    $(el).daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    });
    $(el).on('apply.daterangepicker', function(ev, picker) {
      vnode.context.$emit('date-range-changed', picker);
    });
  }
};

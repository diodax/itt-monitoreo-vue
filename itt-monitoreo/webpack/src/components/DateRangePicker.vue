<template>
  <input type="text" :id="id" :name="id" class="form-control" />
</template>

<script>
// Source: https://jsfiddle.net/michaelsogos/7cok6dox/
//        https://vuejsdevelopers.com/2017/05/20/vue-js-safely-jquery-plugin/

import $ from 'jquery';
import 'moment';
import '../../static/plugins/bootstrap-daterangepicker/js/daterangepicker.js'

export default {
  name: 'DateRangePicker',
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
  },

  mounted() {
    var self = this;
  	var input = $('input[name="'+ this.id +'"]');
  	input.daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        opens: 'center',
        drops: 'up',
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    });
    input.on('apply.daterangepicker', function(ev, picker) {
      self.$emit('date-range-changed', picker);
    });
  }
}


</script>

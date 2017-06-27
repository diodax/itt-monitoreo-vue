<template>
<div></div>
</template>

<script>
// Source: https://codepen.io/diemah77/pen/gaRKQq

import $ from 'jquery';
import 'fullcalendar';
import 'moment';

export default {
  // Do not forget this little guy
  name: 'Calendar',
  // component properties/variables
  props: {
    events: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    },

    droppable: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  // variables
  data() {
    return {
      cal: null
    };
  },
  mounted() {
    var self = this;
    self.cal = $(self.$el);

    var args = {
      //lang: 'en',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: "auto",
      allDaySlot: false,
      slotEventOverlap: false,
      timeFormat: 'HH:mm',

      events: self.events,

      dayClick: function(date) {
        self.$dispatch('day::clicked', date);
        self.cal.fullCalendar('gotoDate', date.start);
        self.cal.fullCalendar('changeView', 'agendaDay');
      },

      eventClick: function(event) {
        self.$dispatch('event::clicked', event);
      }
    }

    if (self.editable) {
      args.editable = true;
      args.eventResize = function(event) {
        self.$dispatch('event::resized', event);
      }

      args.eventDrop = function(event) {
        self.$dispatch('event::dropped', event);
      }
    }

    if (self.droppable) {
      args.droppable = true;
      args.eventReceive = function(event) {
        self.$dispatch('event::received', event);
      }
    }
    this.cal.fullCalendar(args);
  },
};
</script>

<style src="../../static/bootstrap/css/bootstrap.min.css"></style>

<style>
@import url('/static/plugins/fullcalendar/fullcalendar.min.css');

.wrapper {
  margin: 2rem;
}
</style>

<!-- Theme style -->
<style src="../../static/adminLte/css/AdminLTE.min.css"></style>
<!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
<style src="../../static/adminLte/css/skins/_all-skins.min.css"></style>

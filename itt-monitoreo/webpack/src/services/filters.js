//Sources: https://forum.vuejs.org/t/how-to-format-date-for-display/3586/4
//Sources: https://github.com/vuejs/vue/issues/2756

import moment from 'moment';

//
// filters.js
//
function filterBy(list, value) {
  return list.filter(function(item) {
    return item.indexOf(value) > -1;
  });
}

function findBy(list, value) {
  return list.filter(function(item) {
    return item === value;
  });
}

function reverse(value) {
  return value.split('').reverse().join('');
}

function formatDate(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
  }
}

export {filterBy, reverse, findBy, formatDate};

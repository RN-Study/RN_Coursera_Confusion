import moment from 'moment';

export const getCurrentDate = () => {
  var day = moment(new Date().getDate(), 'DD').format('DD');
  var month = moment(new Date().getMonth() + 1, 'MM').format('MM');
  var year = new Date().getFullYear();
  return year + '-' + month + '-' + day;
};

export const getCurrentTime = () => {
  var hours = moment(new Date().getHours(), 'HH').format('HH');
  var min = moment(new Date().getMinutes(), 'mm').format('mm');
  var sec = moment(new Date().getSeconds(), 'ss').format('ss');
  return 'T' + hours + ':' + min + ':' + sec;
};

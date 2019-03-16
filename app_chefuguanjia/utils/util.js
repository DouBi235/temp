const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getBeforeDate = function(n) {
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
  return s;
}

const getDateTo = function (n){
  var dd = new Date();
  dd.setDate(dd.getDate() + n);
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() + 1);
  var d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
  return y + "-" + m + "-" + d;
}

module.exports = {
  formatTime: formatTime,
  getBeforeDate: getBeforeDate,
  getDateTo: getDateTo, 
}

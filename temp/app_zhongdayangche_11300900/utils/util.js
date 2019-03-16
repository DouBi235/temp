const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function twonum(ifonenum) {
  if (ifonenum < 10) {
    ifonenum = '0' + ifonenum;
    return ifonenum;
  } else {
    return ifonenum;
  }
}
function timestampToTime(timestamp) {
  Number(timestamp);
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + '-';
  var M = twonum(date.getMonth() + 1) + '-';
  var D = twonum(date.getDate()) + ' ';
  var h = twonum(date.getHours()) + ':';
  var m = twonum(date.getMinutes()) + ':';
  var s = twonum(date.getSeconds());
  return Y + M + D + h + m + s;
} 
function timestampToDate(timestamp) {
  Number(timestamp);
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + '-';
  var M = twonum(date.getMonth() + 1) + '-';
  var D = twonum(date.getDate()) + ' '; 
  return Y + M + D;
}  
function MD_hm(timestamp) {
  Number(timestamp);
  var date = new Date(timestamp * 1000); 
  var M = twonum(date.getMonth() + 1) + '月';
  var D = twonum(date.getDate()) + '日 ';
  var h = twonum(date.getHours()) + ':';
  var m = twonum(date.getMinutes()); 
  return M + D + h + m + s;
} 
module.exports = {
  formatTime: formatTime,
  timestampToTime: timestampToTime,
  timestampToDate: timestampToDate,
  MD_hm: MD_hm
}
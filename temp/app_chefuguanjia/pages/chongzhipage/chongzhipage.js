// pages/chongzhipage/chongzhipage.js
const app = getApp();
let myDate = new Date();
let nowYY = myDate.getFullYear();
let nowMM = myDate.getMonth() + 1;
let date = nowYY + '年' + nowMM + '月';
let t = nowYY + '-' + nowMM;
Page({
  data: {
    sum: '',
    list: [],
    date: date,
    endtime: t
  },

  onLoad: function(options) {

  },

  onShow: function() {
    this._getrecord();
  },
  _getrecord: function(time = t) {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/payLogs',
      data: {
        uid: app.gd.uid,
        time: time
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            list: res.data.data.list,
            sum: res.data.data.sum
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none', 
            duration: 1500,
          })
          this.setData({
            sum: 0,
            list: []
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value.substring(0, 4) + '年' + e.detail.value.substring(5, 7) + '月'
    })
    this._getrecord(e.detail.value)
  }
})
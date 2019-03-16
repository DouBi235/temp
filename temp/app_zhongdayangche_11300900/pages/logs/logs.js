//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReachBottom: function () {
    var that = this;
    console.log(123) 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})

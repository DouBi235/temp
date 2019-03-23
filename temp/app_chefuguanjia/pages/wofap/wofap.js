// pages/wofap/wofap.js
const app = getApp();
Page({

  data: {
    fad: '',
    imgUrl: app.gd.imgUrl,
  },

  onLoad: function(options) {
    this.getmyInvoice();
  },

  getmyInvoice: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/myInvoice',
      data: {
        unionId: app.gd.unionId
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            fad: res.data.data
          })
        } else {
          this.setData({
            fad: ''
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
})
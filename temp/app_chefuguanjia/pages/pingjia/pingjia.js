// pages/pingjia/pingjia.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: '',
    rid: '',
    xing1: '',
    xing2: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      sid: options.shopid,
      rid: options.id,
    })
  },
  updataData: function(e) {
    console.log(e)
    this.setData({
      xing1: e.detail.liang
    })
  },
  updataData1: function(e) {
    console.log(e)
    this.setData({
      xing2: e.detail.liang
    })
  },
  wheninput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit: function() {
    let d = this.data;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/evaluate',
      data: {
        oil_shop_id: d.sid,
        uid: app.gd.uid,
        record_id: d.rid,
        service_class: d.xing1,
        work_class: d.xing2,
        content: d.content,
      },
      method: 'post',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true,
          })
          let timer = setInterval(function() {
            wx.navigateBack({
              delta: 1,
            })
            clearInterval(timer)
          }, 1500)
        }
      },
    })
  }
})
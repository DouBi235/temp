// pages/tousu/tousu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rid: '',
    sid: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      rid: options.id,
      sid: options.shopid,
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
      url: app.gd.globalUrl + 'ubi/Oilhp/complaint',
      data: {
        oil_shop_id: Number(d.sid),
        record_id: Number(d.rid), 
        content: d.content,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true,
          })
          let timer = setInterval(function () {
            wx.navigateBack({
              delta: 1,
            })
            clearInterval(timer)
          }, 1500)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
// pages/faultWarning/faultWarning.js
const app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warnTip: [],
    imgUrl: app.gd.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.data.deviceStatus == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未绑定设备，请先绑定设备',
        showCancel: true,
        confirmText: '去绑定',
        confirmColor: '#09bb07',
        success: function(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../bindDevice/bindDevice',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    } else {
      this.getWarning();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getWarning: function() {
    let that = this;
    wx.request({
      url: urlHeader + 'ubi/getWarning',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            warnTip: res.data.data.list,
            status: res.data.data.status,
          })
        } else {
          that.setData({
            warnTip: [],
          })
        }
      },
    })
  },

  makePhone: function() {
    wx.request({
      url: urlHeader + 'ubi/Remind/getPhone',
      method: 'post',
      data: {
        uid: app.gd.uid
      },
      success: function(res) {
        wx.showModal({
          title: '提示',
          showCancel: true,
          content: ' 确认咨询车管家专员？',
          success: function(res2) {
            if (res2.confirm) {
              wx.makePhoneCall({
                phoneNumber: res.data.data
              })
            }
          }
        })
      }
    })
  },
  ignoreBtn: function(e) {
    console.log(e)
    let that = this;
    wx.request({
      url: urlHeader + 'ubi/Remind/hulue',
      data: {
        uid: app.gd.uid,
      },
      method: 'POST',
      success: function(res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
        })
        that.getWarning();
      },
    })
  },
  Consultation: function() {

  }
})
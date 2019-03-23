// pages/protectiveCar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    proList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.data.deviceStatus == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未绑定设备，请先绑定设备',
        showCancel: true,
        confirmText: '去绑定',
        confirmColor: '#09bb07',
        success: function (res) {
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
      that.isCar();
    }
  },
  isCar: function(){
    let that = this;
    wx.showLoading()
    wx.request({
      url: app.gd.globalUrl + 'ubi/isCar',
      data: {uid: app.gd.uid}, 
      method: 'POST', 
      success: function(res) {
        console.log( "isCar:" +  res.data.data);
        wx.hideLoading()
        that.setData({
          proList: res.data.data
        })
      }, 
      fail:function(){
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
          duration: 1500, 
        })
      }
    })
  }
 
})
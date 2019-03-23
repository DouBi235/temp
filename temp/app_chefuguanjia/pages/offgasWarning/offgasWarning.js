// pages/offgasWarning/offgasWarning.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    offgas: 1,  // 0 异常，1 正常 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
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
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
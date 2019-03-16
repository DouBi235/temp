// pages/submit/submit.js
const app = getApp(),
  url = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.getStorage({
      key: 'totalData',
      success: res => {
        this.setData({
          totalData: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getStorage({
      key: 'totalData',
      success: function(res) {
        console.log(res.data)
      },
    })
  },
  Submission() { //提交保单信息
    let totalData = {...this.data.totalData, plate: this.data.totalData.CarownerData.plate};
    //     company = totalData.company,
    //     policy_num = totalData.policy_num,
    //     name_price = totalData.name_price,
    //     start_time = totalData.start_time,
    //     end_time = totalData.end_time,
    //     img = totalData.img,
    //     uid
    wx.request({
      url: url + 'ubi/Refund/policyUpload',
      method: 'POST',
      data: totalData,
      success: res => {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../return/return',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
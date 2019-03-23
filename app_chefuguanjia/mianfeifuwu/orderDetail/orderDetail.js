// pages/orderDetail/orderDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{},
    orderText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    wx.request({
      url: app.gd.globalUrl + '/ubi/MyOrder/orderDetail',
      data: {
        uid:app.gd.id,
        id:options.id
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
       _this.setData({
         orderInfo:res.data.data
       })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleModifywxc(even) {
    wx.navigateTo({
      url: '/mianfeifuwu/modifyOrder/modifyOrder?id=' + even.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
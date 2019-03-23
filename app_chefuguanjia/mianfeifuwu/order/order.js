// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect:'left',
    orderList:[]

  },
  handleData(isOver) {
    var _this = this
    wx.request({
      url: app.gd.globalUrl + isOver,
      data: {
        uid: app.gd.uid
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code==0) {
          _this.setData({
            orderList:[]
          })
          wx.showToast({
            title:res.data.msg,
            icon: 'none'            
          })
        }else {
          _this.setData({
            orderList: res.data.data.list
          })
          console.log(_this.data.orderList)
        }        
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {},
    })
  },
  handleOrderDetail(even) {
    wx.navigateTo({
      url: '/mianfeifuwu/orderDetail/orderDetail?id=' + even.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleModifywxc(even) { //修改维修厂
    wx.navigateTo({
      url: '/mianfeifuwu/modifyOrder/modifyOrder?id=' + even.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    });  
    this.handleData('/ubi/MyOrder/myOrder'); 
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
  handlewcOrW(even) {
    this.setData({
      isSelect:even.currentTarget.dataset.type
    })
    const isOver = this.data.isSelect == 'left' ? '/ubi/MyOrder/myOrder' :'/ubi/MyOrder/finshOrder'
    this.handleData(isOver)
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
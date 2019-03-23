// pages/chooseWxc/chooseWxc.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect:'bby',
    wxcList:[],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this
    wx.request({
      url: app.gd.globalUrl + '/ubi/ServeShop/service',
      data: {
        uid:app.gd.uid,
        shop_type:1
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        _this.setData({
          wxcList:res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleSwitch(even) {  //切换数据
    var _this = this
    _this.setData({
      isSelect:even.currentTarget.dataset.type == '2' ? 'fwd' : 'bby'
    })
    wx.request({
      url: app.gd.globalUrl + '/ubi/ServeShop/service',
      data: {
        uid:app.gd.uid,
        shop_type: Number(even.currentTarget.dataset.type)
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        _this.setData({
          wxcList:res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleChoose(even) { 
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];    
    prevPage.setData({  
      chooseStore:even.currentTarget.dataset.id
    })
    wx.navigateBack({
      delta: 1  
    })
  },
  handleWxcDetails(even) { //跳转至维修厂详情  
    wx.navigateTo({
      url: '/mianfeifuwu/details/details?sid=' + even.currentTarget.dataset.sid + '&item=' + JSON.stringify(even.currentTarget.dataset.item),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '选择维修厂',
    })
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
// pages/personalCentre.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    head_pic:'',
    nick_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/user/userInfo',
      data: {
        uid: app.globalData.uid, 
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            name:res.data.data.name,
            nick_name:res.data.data.nick_name,
            phone:res.data.data.phone,
            head_pic:res.data.data.head_pic
          })
        }else{
          console.log('获取数据失败',)
        }
      }
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
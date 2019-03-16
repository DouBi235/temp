//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      
  },
  //事件处理函数
  // more:function(){
  //   wx.navigateTo({
  //     url: '../more/more',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  onLoad: function () {
     
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

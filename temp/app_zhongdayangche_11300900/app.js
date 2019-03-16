//app.js 
App({
  onLaunch: function () {
    var that = this;
    // console.log("是否授权", this.globalData.userInfo);
    // console.log("是否授权",this.globalData.uid);
    // 展示本地存储能力
    // 登录 
    // if (wx.getStorageSync('uid')) { 
    //   that.globalData.uid = wx.getStorageSync('uid') 
    //   if (that.globalData.uid == wx.getStorageSync('uid')) {
    //     console.log("从storage中获取uid，并保存到全局变量中")
    //   }
    // } else {
    //   console.log("storage 中无uid;")
    // }
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now()) 
    // wx.setStorageSync('logs', logs) 
    console.log("域名为：",this.globalData.globalUrl) 
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    uid:null,
    isopen:false,
    globalUrl:'https://mp.ctbls.com',  // pro
    // globalUrl:'https://xmp.ctbls.com',  // dev
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newData:[],
    oldData:[]
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "免费服务"
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })    
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var _this = this
    wx.request({
      url: app.gd.globalUrl + '/ubi/Product/goodsList',
      data: {
        uid: app.gd.uid
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if(res.data.code) {
          _this.setData({
            newData: res.data.data.new,
            oldData: res.data.data.old
          })
        }else {
          wx.showToast({
            title:res.data.msg,
            icon:"none"
          })
        }
        
      },
      fail: function (res) { 
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  handleItemClick(event) { 
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url:'/mianfeifuwu/projectDetail/projectDetail?id=' + id
    }) 
  },
  handleMoa() {
    
  }
})

const app = getApp();
let uid = app.gd.uid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    userInfo: '',
    openid: '',
    Tips: {}, //所有的消息提示
    balance: '--'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  exception: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/exception',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#09bb07',
            success: function(res) {},
          })
        }
      },
    })
  },
  getopenID() { //获取openid
    wx.getStorage({
      key: 'openid',
      success: res => {
        this.setData({
          openid: res.data
        })
      }
    })
  },
  WhetherLogin() { //判断用户是否是登录状态,如果没有登录返回首页进行登录 
    if (app.gd.uid === '') { //uid是当前用户id,如果有uid代表用户已经登录
      wx.showModal({ //如果没有登录,告诉用户需要回到首页进行登录
        title: '提示',
        content: '未登录成功',
        showCancel: false,
        success: e => {
          if (e) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
  },
  userInfon() { //获取用户信息
    var that = this;
    that.setData({
      userInfo: app.gd.userInfo
    })
  },
  _ObtainUserInfo() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/info',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            Tips: res.data.data
          })
          if (res.data.data.unread != 0){
            wx.showTabBarRedDot({
              index: 4,
            })
          }else{
            wx.hideTabBarRedDot({
              index: 4, 
            })
          }
        }
      }
    })
  },
  onShow: function() {
    this.WhetherLogin();
    this.userInfon();
    this.getopenID();
    this.exception();
    this._ObtainUserInfo();
    this._getbalance();
  },
  skipshebei: function() {
    wx.navigateTo({
      url: '../bindDevice/bindDevice',
    })
  },
  skipOrder: function() {
    wx.navigateTo({ //跳转到我的订单页面
      url: '../order/order',
    })
  },
  skiptixian: function() {
    wx.navigateTo({ //
      url: '../tixian/tixian',
    })
  },
  skipServer() { //跳转到我的服务项
    wx.navigateTo({
      url: '../MyService/MyService',
    })
  },
  skipMine_od: function() {
    wx.navigateTo({ //跳转我的预约页面
      url: '../mine_od/mine_od',
    })
  },
  skipMessage: function() {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  myBooking() {
    wx.navigateTo({
      url: '/mianfeifuwu/order/order',
    })
  },
  skipMy: function() { //判断用户有没有车辆,如果有车辆信息,自动完善信息,没有手动完善信息 
    wx.navigateTo({           
      url: '../Mypersonal/Mypersonal',
    })
  },
  skipMyPolicy: function() {
    wx.navigateTo({
      url: '../myPolicy/myPolicy',
    })
  },
  skipfagl: function() {
    wx.navigateTo({
      url: '../wofap/wofap',
    })
  },
  skipqianbao: function() {
    wx.navigateTo({
      url: '../uqianbao/uqianbao',
    })
  },
  _getbalance: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/getMoney',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.setData({
            balance: res.data.data
          })
        } else {
          this.setData({
            balance: '--'
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})
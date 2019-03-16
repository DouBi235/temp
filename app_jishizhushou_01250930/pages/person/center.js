const app = getApp()
Page({
  data: {
    headurl: '/img/userhead.png',
    username: '',
    shopname: '',
    isauth: false,
    phone: ''
  },

  onShow: function() {
    var uhead = app.globalData.uhead
    if (uhead) {
      this.setData({ //头像
        headurl: uhead
      })
    } 
    wx.getStorage({
      key: 'userinfo',
      success: (res) => {
        this.setData({ //名称
          username: res.data.name,
          phone: res.data.phone
        })
      }
    })
    if (!app.globalData.uid) {
      return;
    }
    this._hasrenzheng();
    this._getDetail();
  },
  three: function() {
    if (this._islogin()) {
      wx.navigateTo({
        url: '/pages/person/exshop'
      })
    }
  },
  four: function() {
    if (this._islogin()) {
      wx.navigateTo({
        url: '/pages/chengzhangjijin/chengzhangjijin'
      })
    }
  },
  five: function() {
    if (this._islogin()) {
      wx.navigateTo({
        url: '/pages/list/msg'
      })
    }
  },
  toinfo: function() {
    if (this._islogin()) {
      wx.navigateTo({
        url: '/pages/person/info'
      })
    }
  },
  _getDetail: function() {
    wx.request({
      url: app.globalData.url + '/worker/user/shopDetail',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => {
        if (res.data.code == 1) { //汽修厂名称
          this.setData({
            shopname: res.data.data.shop.company
          })
        }
      }
    })
  },
  _hasrenzheng: function() {
    wx.request({
      url: app.globalData.url + '/worker/Bang/cert',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => {
        if (res.data.code == 1) {
          app.globalData.isauth = 1;
          this.setData({
            isauth: 1
          })
        } else {
          app.globalData.isauth = 0;
          this.setData({
            isauth: 0
          })
        }
      }
    })
  },
  _islogin: function() {
    if (!app.globalData.islogin) {
      wx.showModal({
        title: '您还未登录',
        content: '请返回首页登录',
        showCancel: false,
        confirmColor: '#1070ff'
      })
      return false;
    } else {
      return true;
    }
  },
})
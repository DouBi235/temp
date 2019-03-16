const app = getApp()
Page({
  data: {
    udepot: '',
    udepotname: '',
    hidereposition: true
  },
  bos: function(e) {
    if (e.detail.authSetting["scope.userLocation"]) {
      this.setData({
        hidereposition: true
      })
      this._updateposition()
    }
  },
  getstoragedepot: function() { //从storage获取修理厂 
    wx.getStorage({
      key: 'udepotid',
      success: (res) => {
        if (res.data) {
          this.setData({
            udepot: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'udepotname',
      success: (res) => {
        if (res.data) {
          this.setData({
            udepotname: res.data
          })
        }
      }
    })
  },
  getdatadepot: function() { //从后台获取修理厂 
    wx.request({
      url: app.globalData.url + '/worker/user/shopDetail',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            udepotname: res.data.data.shop.company,
            udepot: res.data.data.shop.sid
          })
        }
      }
    })
  },
  onShow: function() {
    wx.getStorage({ //判断是否从汽修厂列表返回
      key: 'depotchange',
      success: (res) => {
        if (res.data) {
          this.getstoragedepot()
        } else {
          this.getdatadepot()
        }
      }
    })
  },
  onLoad: function() {
    this._updateposition()
  },
  onUnload: function() {
    wx.setStorage({
      key: 'depotchange',
      data: ''
    })
  },
  selectdepot: function() { //去选择修理厂
    wx.navigateTo({
      url: '/pages/list/depot'
    })
  },
  formSubmit: function(e) {
    var obj = e.detail.value
    wx.request({
      url: app.globalData.url + '/worker/user/exShop',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        sid: obj.sid,
        reason: obj.reason
      },
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          confirmColor: '#1070ff',
          success: function() {
            if (res.data.code == 1) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  },

  _updateposition: function () {
    if (app.globalData.hasposition) {
      return;
    }
    wx.getLocation({
      altitude: false,
      success: function (res) {
        wx.request({
          url: app.globalData.url + '/worker/index/upCoord',
          data: {
            lat: res.latitude,
            lng: res.longitude,
            uid: app.globalData.uid
          },
          success: function (res) {
            if (res.data.code == 1) {
              app.globalData.hasposition = true
            }
          }
        })
      },
      fail: () => {
        this.setData({
          hidereposition: false
        })
      }
    })
  },
})
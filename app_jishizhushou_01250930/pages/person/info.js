const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userhead: '/img/userhead.png',
    cartype: 1,
    date: '',
    udepot: '',
    udepotname: '',
    initinfo: {},
    timelimit: '',
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
  uploadhead: function() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        var respath = res.tempFilePaths[0]
        wx.uploadFile({ //上传头像
          url: app.globalData.url + '/worker/user/uploadPic',
          filePath: respath,
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: (res) => {
            wx.hideLoading();
            if (res.statusCode == 413) {
              wx.showToast({
                title: '图片体积过大',
                icon: 'none'
              })
              return;
            }
            var redata = JSON.parse(res.data)
            this.setData({
              userhead: redata.data.url
            })
          }
        })
      }
    })
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
  _updateposition: function() {
    if (app.globalData.hasposition) {
      return;
    }
    wx.getLocation({
      altitude: false,
      success: (res) => {
        wx.request({
          url: app.globalData.url + '/worker/index/upCoord',
          data: {
            lat: res.latitude,
            lng: res.longitude,
            uid: app.globalData.uid
          },
          success: (res) => {
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
  onLoad: function() {
    this._updateposition()
    wx.getStorage({
      key: 'userinfo',
      success: (res) => {
        this.setData({
          initinfo: res.data,
          cartype: res.data.repair,
          date: res.data.server
        })
      }
    })
    var time = util.formatTime(new Date())
    this.setData({
      timelimit: time
    })
    if (app.globalData.uhead) {
      this.setData({
        userhead: app.globalData.uhead
      })
    }
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
  dateChange: function(e) { //从业时间
    this.setData({
      date: e.detail.value
    })
  },
  radioChange: function(e) { //车型
    this.setData({
      cartype: e.detail.value
    })
  },
  putinfo: function(e) { //确认
    var getform = e.detail.value
    var obj = {
      uid: app.globalData.uid,
      head: getform.uhead,
      repair: getform.cartype,
      name: getform.uname,
      phone: getform.utel,
      server: getform.udate,
      sid: getform.udepot,
      skill: getform.uskill
    }
    wx.request({
      url: app.globalData.url + '/worker/user/updateWorker',
      method: "POST",
      data: obj,
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          confirmColor: '#1070ff',
          success: function() {
            if (res.data.code == 1) {
              app.globalData.hasrepair = getform.cartype
              let userinfo = wx.getStorageSync("userinfo");
              userinfo.head = getform.uhead;
              userinfo.repair = getform.cartype;
              userinfo.name = getform.uname;
              userinfo.phone = getform.utel;
              userinfo.server = getform.udate;
              userinfo.sid = getform.udepot;
              userinfo.skill = getform.uskill;
              wx.setStorageSync("userinfo", userinfo)
              wx.navigateBack();
            }
          }
        })
      }
    })
  }
})
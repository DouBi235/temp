const app = getApp()
Page({
  data: {
    isauth: false,
    hadinfo: false,
    userInfo: {},
    hasUserInfo: false,
    wxhead: '/img/userhead.png',
    utel: '',
    uname: '',


    hasload: false,
    imgstatic: '../../img/camera.png',
    imgload: '',
    text: ''
  },
  onLoad: function() {
    this._initlogin();
    wx.setStorage({
      key: 'depotchange',
      data: '',
    })
  },
  onShow: function() {
    console.log(app.globalData)
    var cur = app.globalData.hasrepair
    if (cur) {
      this._gethead();
      this._isrenzheng();
    }
  },
  getUserInfo: function(e) {
    if (!e.detail.userInfo) {
      this.setData({
        hasUserInfo: true
      })
      wx.showModal({
        title: '提示',
        content: '不登录将无法正常使用',
        showCancel: false,
        confirmColor: '#1070ff'
      })
      return;
    }
    this._upuserinfo(e.detail.userInfo)
    this.setData({
      hasUserInfo: true,
      userInfo: e.detail.userInfo
    })
    app.globalData.userInfo = e.detail.userInfo
  },
  todatacar_new() {
    wx.navigateTo({
      url: '/pages/list/datacar_new'
    })
  },
  input: function(e) {
    var val = e.detail.value
    this.setData({
      text: val
    })
  },
  loadimg: function() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.showLoading({
          title: '上传中',
        })
        var respath = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.url + '/worker/bang/uploadPic',
          filePath: respath,
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            'uid': app.globalData.uid
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
            wx.showLoading({
              title: '识别中'
            })
            var redata = JSON.parse(res.data);
            this.setData({
              hasload: true,
              imgload: respath
            })
            this._exg(redata.data.url)
          }
        })
      }
    })
  },
  getinfo: function() {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/worker/bang/bang',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        plate_number: this.data.text
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 1) {
          wx.setStorage({
            key: 'carinfo',
            data: res.data.data,
            success: () => {
              wx.navigateTo({
                url: '/pages/bby/searchcar',
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            confirmColor: '#1070ff',
            showCancel: false
          })
        }
      }
    })
  },

  _gethead: function() {
    wx.request({ //获取头像
      url: app.globalData.url + '/worker/user/userInfo',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => {
        if (res.data.code == 1) {
          var info = res.data.data.userInfo
          var headimg = info.head ? info.head : info.wx_head
          this.setData({
            wxhead: headimg
          })
          app.globalData.uhead = headimg
          wx.setStorage({
            key: 'userinfo',
            data: info
          })
          if (info.name != "" && info.phone != "") {
            this.setData({
              hadinfo: true,
              uname: info.name,
              utel: info.phone
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  _exg: function(url) {
    wx.request({
      url: app.globalData.url + '/worker/bang/exg',
      method: "POST",
      data: {
        pic: url
      },
      success: (res) => {
        this._delplateimg(url)
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            confirmColor: '#1070ff',
            showCancel: false
          })
          return;
        }
        var text = res.data.data.cards[0]
        this.setData({
          text: text
        })
      }
    })
  },
  _delplateimg: function(deimg) {
    wx.request({
      url: app.globalData.url + '/worker/Bang/delImage',
      data: {
        image: deimg
      },
      success: (res) => {
        console.log(res.data)
      }
    })
  },
  _isrenzheng: function() {
    wx.request({
      url: app.globalData.url + '/worker/index/identification',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => { //是否认证
        app.globalData.isauth = res.data.data.user.cert
        this.setData({
          isauth: res.data.data.user.cert
        })
      }
    })
  },
  _initlogin: function() {
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: app.globalData.userInfo
      })
      this._upuserinfo(app.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: res => {
          this.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          this._upuserinfo(res.userInfo)
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  _upuserinfo: function(data) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    app.globalData.islogin = true
    wx.login({
      success: res => {
        var obj = {
          code: res.code,
          nick_name: data.nickName,
          head_pic: data.avatarUrl,
          sex: data.gender
        }
        wx.request({
          url: app.globalData.url + '/worker/index/login',
          data: obj,
          success: (res) => {
            var data = res.data.data
            app.globalData.uid = data.uid
            wx.hideLoading()
            if (data.status) {
              app.globalData.hasrepair = data.repair
              console.log(app.globalData)
              this._gethead();
              this._isrenzheng();
            } else {
              wx.navigateTo({
                url: '/pages/person/info'
              })
            }
          }
        })
      }
    })
  },
})
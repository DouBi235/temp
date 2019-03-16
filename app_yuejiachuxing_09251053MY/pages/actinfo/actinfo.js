const app = getApp()
Page({
  data: {
    evt: {},
    piclen: 1,
    hasUserBm: false
  },
  copywx: function (e) {
    var evt = this.data.evt
    if (evt.user == 0 && evt.tp == 0) { return; }
    var wxnum = e.currentTarget.dataset.wx
    wx.setClipboardData({
      data: wxnum,
      success() {
        wx.showToast({
          title: '微信号已复制',
          mask: true
        })
      }
    })
  },
  phonecall: function (e) {
    var evt = this.data.evt
    if (evt.user == 0 && evt.tp == 0) { return; }
    var ph = e.currentTarget.dataset.ph
    wx.showModal({
      title: '是否拨打电话',
      content: ph,
      confirmColor: '#21C5BD',
      cancelColor: '#666',
      success(e) {
        if (e.confirm) {
          wx.makePhoneCall({
            phoneNumber: ph
          })
        }
      }
    })
  },
  bmtap: function () {
    wx.showLoading({
      title: '请稍等'
    })
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/perfect',
      data: { uid: app.globalData.uid },
      success(e) {
        if (e.data.code) {
          that.resjoin()
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: e.data.msg,
            showCancel: false,
            confirmColor: '#21C5BD',
            success: function () {
              wx.navigateTo({
                url: '/pages/person/info?from=actinfo'
              })
            }
          })
        }
      }
    })
  },
  resjoin: function () {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Participation/takePart',
      data: {
        uid: app.globalData.uid,
        id: that.data.evt.id
      },
      success: function (e) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: e.data.msg,
          showCancel: false,
          confirmColor: '#21C5BD',
          success: function () {
            if (e.data.code) { //报名成功
              wx.redirectTo({
                url: '/pages/mine/join'
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (options) {
    const that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Main/detail',
      data: {
        uid: app.globalData.uid,
        aid: options.aid
      },
      success: function (e) {
        if (e.statusCode != 200) {
          wx.showModal({
            title: '错误',
            content: '服务器繁忙，请稍后再试',
            showCancel: false,
            confirmColor: '#21C5BD',
            success: function () {
              wx.navigateBack()
            }
          })
          return;
        }
        var info = e.data.data
        info.head_image1.reverse()
        info.wx_number1.reverse()
        info.phone1.reverse()
        if (!info.user) { //若用户身份为参与者，头像列表个数限制
          info.head_image1 = info.head_image1.slice(0, 9)
          info.head_image1.reverse()
        }
        info.hasUserBm = info.head_image1.length
        that.setData({
          evt: info,
          piclen: info.pic.length
        })
      }
    })
  },
  onShareAppMessage: function () {}
})
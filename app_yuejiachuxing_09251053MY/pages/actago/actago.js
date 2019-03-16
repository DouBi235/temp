const app = getApp()
var thataid = 0
Page({
  data: {
    evt: {},
    piclen: 1,
    pllist: [],
    pllen: 0,
    showlist: [],
    showlen: 0,
    plnomore: true,
    plput: ''
  },
  plput: function (e) {
    this.setData({
      plput: e.detail.value
    })
  },
  putpl: function () {
    var that = this
    var val = this.data.plput
    if (!val.replace(/\s+/g, "")) {
      wx.showToast({
        title: '不能发表空评论哦',
        icon: 'none',
        mask: true
      })
      return;
    }
    wx.request({
      url: 'https://mp.ctbls.com/trip/Main/discuss',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        aid: thataid,
        comment: val
      },
      success(e) {
        wx.showToast({
          title: e.data.msg,
          icon: 'none',
          mask: true,
          success() {
            if (e.data.code) {
              that.setData({
                plput: ''
              })
              that.getpllist()
            }
          }
        })
      }
    })
  },
  onLoad: function (opt) {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Main/pastDetail?id=' + opt.aid,
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
        thataid = opt.aid
        that.setData({
          evt: e.data.data,
          piclen: e.data.data.pic.length
        })
        that.getpllist()
      }
    })
  },
  getpllist: function () {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Main/disList?aid=' + thataid,
      success: function (res) {
        const e = res.data.data
        if (e.length) {
          that.setData({
            pllist: e,
            pllen: e.length,
            showlen: 10,
            showlist: e.slice(0, 10),
            plnomore: (e.length > 10 ? false : true)
          })
        }
      }
    })
  },
  onReachBottom: function () {
    const plnomore = this.data.plnomore
    if (plnomore) {
      return;
    } else {
      const e = this.data.pllist
      const pllen = this.data.pllen
      var len = this.data.showlen
      len += 10
      if (pllen > len) {
        this.setData({
          showlist: e.slice(0, len),
          showlen: len
        })
      } else {
        this.setData({
          showlist: e.slice(0, len),
          plnomore: true
        })
      }
    }
  }
})
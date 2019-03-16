Page({
  data: {
    content: {}
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Verdict/getBannerDetail',
      data: {
        id: options.bid
      },
      success: function (res) {
        that.setData({
          content: res.data.data
        })
      }
    })
  }
})
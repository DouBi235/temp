const app = getApp()
Page({
  data: {
    evt: {},
    piclen: 1,
    stlist: ['审核中','已审核','审核未通过','已结束','人数已满']
  },
  onLoad: function (options) {
    const that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Activity/yueDetails?id=' + options.aid,
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
        that.setData({
          evt: e.data,
          piclen: e.data.pic.length
        })
      }
    })
  },
  onShow: function () { }
})
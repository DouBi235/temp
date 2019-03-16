const app = getApp()
Page({
  data: {
    uhead: '',
    uname: ''
  },
  onLoad: function (options) {
    var ui = app.globalData.userInfo
    this.setData({
      uhead: ui.avatarUrl,
      uname: ui.nickName
    })
  },
  tomine: function (e) {
    var goto = e.currentTarget.id
    if (goto == 'info') {
      wx.navigateTo({
        url: '/pages/person/info'
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/' + goto
      })
    }
  }
})
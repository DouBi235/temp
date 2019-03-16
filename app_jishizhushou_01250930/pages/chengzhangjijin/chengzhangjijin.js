const app = getApp();
Page({
  data: {
    bbylist: []
  },
  loadbby: function() {
    wx.request({ //邦保养
      url: app.globalData.url + '/worker/user/bangRewardList',
      data: {
        uid: app.globalData.uid
      },
      success: (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else {
          this.setData({
            bbylist: res.data.data.list
          })
        }
      }
    })
  },
  onShow: function() {
    this.loadbby();
  },
  onPullDownRefresh: function() {
    this.loadbby();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 500)
  },
})
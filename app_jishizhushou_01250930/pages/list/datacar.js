const app = getApp()
Page({
  data: {
    array: [],
    index: 0,
    carinfo: {},
    isknow: false
  },
  isknow: function() {
    this.setData({
      isknow: true
    })
  },
  PickerChange: function(e) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    var index = e.detail.value
    var ctid = this.data.array[0][index]
    this.setData({
      index: index
    })
    this.getcarinfo(ctid)
  },
  getcarinfo: function(ctid) {

    wx.request({
      url: app.globalData.url + '/worker/Bang/getDetail',
      data: {
        id: ctid
      },
      success: (res) => {
        wx.hideLoading()
        this.setData({
          carinfo: res.data.data
        })
      }
    })
  },
  onShow: function() {

    var ctid = []
    var ctname = []
    wx.getStorage({
      key: 'ctlist',
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          ctid[i] = res.data[i].id
          ctname[i] = res.data[i].type
        }
        this.setData({
          'array[0]': ctid,
          'array[1]': ctname
        })
        this.getcarinfo(ctid[0])
      }
    })
  }
})
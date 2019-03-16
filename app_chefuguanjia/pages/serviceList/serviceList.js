var app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    page: 1,
    hasMoreData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.list();
  },
  list: function() {
    var that = this;
    wx.request({
      url: urlHeader + 'ubi/Home/CarService',
      method: 'post',
      data: {
        page: that.data.page
      },
      success: function(res) {
        that.setData({
          arr: that.data.arr.concat(res.data.data.list),
          page: that.data.page + 1
        })
        if (res.data.data.list.length < 1) {
          that.setData({
            hasMoreData: false
          })
        }
      }
    })
  }, 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.list();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        duration: 500
      })
    }
  },
 
})
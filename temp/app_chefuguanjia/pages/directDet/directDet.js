// pages/directDet/directDet.js
var app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    item: {}
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      item: JSON.parse(options.item)
    })
    this.getList(options.id);
  },
  getList: function(id){
    let that = this;
    wx.request({
      url: urlHeader + 'ubi/Popularize/getIndirectAward',
      data: { son_unionId: id}, 
      method: 'POST',
      success: function(res) {
        that.setData({
          list: res.data.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
})
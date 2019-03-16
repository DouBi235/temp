// pages/xiaofeipage/xiaofeipage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    text: '暂无消费记录',
    height: '100vh',
    list: [],
    rows: 0,
  },
  onShow: function() {
    this._getdata();
  },
  navpj: function(e) {
    let id = e.currentTarget.dataset.id,
      shopid = e.currentTarget.dataset.sid;
    wx.navigateTo({
      url: '../pingjia/pingjia?id=' + id + '&shopid=' + shopid,
    })
  },
  navtousu: function(e) {
    let id = e.currentTarget.dataset.id,
      shopid = e.currentTarget.dataset.sid;
    wx.navigateTo({
      url: '../tousu/tousu?id=' + id + '&shopid=' + shopid,
    })
  },
  _getdata: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/expenseLogs',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log("ubi/Oilhp/expenseLogs", res)
        if (res.data.code == 1) {
          let d = res.data.data;
          this.setData({
            list: d.list,
            // rows: d.rows
          })
        } else {
          this.setData({
            list: [],
            // rows: 0
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})
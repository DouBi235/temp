//evaluate-det.js
const app = getApp();
Page({  
  data: {
    eC:[]
  },
  onLoad: function(options){
    var that = this;
    that.getContentFn(options.id)
  },
  getContentFn: function (id) {
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/getEvaluate',
      data: {
        uid: app.globalData.uid,
        id: id
      },
      success: function (res) {
        wx.hideLoading();
        console.log("evaluate List res", res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg
          })
        }
        that.setData({
          eC: res.data.data.evaluate
        })
        console.log("evaluate page.eC", that.data.eC);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})

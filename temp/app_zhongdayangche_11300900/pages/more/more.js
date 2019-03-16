// pages/more/more.js
var app = getApp();
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalRow: 1,
    signLi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this;
    page = 1;
    wx.request({
      url: app.globalData.globalUrl + '/st/main/signList',
      data: {
        uid: app.globalData.uid,
        page: page
      },
      success: function (res) { 
        if (res.data.code == 1) {
          var thatlist = that.data.signLi
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            signLi: thatlist,
            totalRow: resrows
          })
          page++;
        }
      } 
    })
  },  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var that = this;
    page = 1; 
    wx.request({
      url: app.globalData.globalUrl + '/st/main/signList',
      data: {
        uid: app.globalData.uid,
        page: page
      },
      success: function (res) { 
        if (res.data.code == 1) {
          wx.showToast({
            title: '刷新成功',
            icon: '',
          })
          var thatlist = []
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            signLi: thatlist,
            totalRow: resrows
          })
          page++;
        }
      } 
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.loadMore(that);
  }, 
  loadMore: function(that) {
    var that = that;
    if (that.data.totalRow < page) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/signList',
      data: {
        uid: app.globalData.uid,
        page: page
      },
      success: function (res) {
        wx.hideLoading() 
        if (res.data.code == 1) {
          var thatlist = that.data.signLi;
          var list = res.data.data.list; 
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            signLi: thatlist
          })
          page++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      }
    }) 
  },
  toProductDet: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDet/productDet?id=' + id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
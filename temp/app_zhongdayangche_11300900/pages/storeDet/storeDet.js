// pages/storeDet/storeDet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeDet:'',
    markers: [{
      id: 1,
      latitude: 23.0990,
      longitude: 113.324,
      name: 'T.I.T 创意园',
      iconPath: '../image/location.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/goodsDetail',
      data: {
        uid: app.globalData.uid,
        id: options.id
      },
      success: function (res) {
        wx.hideLoading();
        console.log("产品详情内容", res)
        var localmarkers = that.data.markers;
        var theshop = res.data.data.shop;
        localmarkers[0].latitude = theshop.lat;
        localmarkers[0].longitude = theshop.lng;
        localmarkers[0].name = theshop.company;
        that.setData({
          storeDet: theshop,
          markers: localmarkers
        })
        console.log("页面的店铺详情 markers", that.data.markers);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  callToStore: function() {
    var phoneNum = this.data.storeDet.serphone;
    wx.makePhoneCall({
      phoneNumber: phoneNum
    })
  },
  mapTo: function(e) {
    console.log("mapto")
    var theshop = this.data.storeDet;
    var latitude = Number(theshop.lat);
    var longitude = Number(theshop.lng);
    var name = theshop.company;
    var address = theshop.city + theshop.county + theshop.address;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: name,
      address: address
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
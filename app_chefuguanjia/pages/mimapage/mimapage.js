// pages/mimapage/mimapage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  wangji: function (){
    wx.navigateTo({
      url: '../wangji/wangji?act=reset',
    })
  }
})
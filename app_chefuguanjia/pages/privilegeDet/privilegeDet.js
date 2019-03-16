// pages/privilegeDet/privilegeDet.js
var WxParse = require('../../wxParse/wxParse.js');
var timer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    change: 0,
    logo: '',
    id: '',
    detail: '',
    time: { ddd: '', hhh: '', mmm: '', sss: '' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      logo: options.logo,
      id: options.id
    })
  },
  product_detail: function() {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Product/product_detail',
      data: {
        uid: app.gd.uid,
        logo: that.data.logo, 
        id: that.data.id 
      },
      method: 'POST',
      success: function(res) {
        console.log("product_detail", res)
        that.setData({
          detail: res.data.data
        })
        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        if (res.data.data.reservation == 1){
          that.daojishi();
        }
      },
    })
  },
  change: function() {
    this.setData({
      change: 0
    })
  },
  change2: function() {
    this.setData({
      change: 1
    })
  },
  btn: function (e) {
    let id = this.data.id;
    wx.navigateTo({
      url: '../subscribe/subscribe?id=' + id,
    })
  }, 
  onShow(a) {
    // console.log(dates.datetime)//数据
    this.product_detail();
  }, 
  daojishi: function(){
    let that = this;
    function nowTime() { 
      console.log("执行 nowTime")
      var intDiff = that.data.detail.time;//获取数据中的时间戳
      // console.log(intDiff)
      var day = 0, hour = 0, minute = 0, second = 0;
      if (intDiff > 0) {//转换时间
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        that.data.detail.time--;
      } else { 
        clearInterval(timer);
        that.product_detail();
      }
      var thetime = { ddd: day, hhh: hour, mmm: minute, sss: second }
      that.setData({
        time: thetime
      })
    }
    nowTime();
    timer = setInterval(nowTime, 1000); 
  },
  onHide: function(){
    clearInterval(timer);
  },
  onUnload: function () {
    clearInterval(timer);
  }
})
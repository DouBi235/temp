// pages/saveFuel/saveFuel.js
const app = getApp();
const imgUrl = app.gd.imgUrl;
let myDate = new Date();
let util = require('../../utils/util.js');
let nowYY = myDate.getFullYear();
let nowMM = myDate.getMonth() + 1;
let nowDD = myDate.getDate();
let nowDate = nowYY + '-' + nowMM + '-' + nowDD;
console.log(nowDate);
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    userInfo: '',
    user: '',
    carCountData: [{
        url: imgUrl+'/savelist1.png',
        title: '总油耗',
        value: '0.00',
        unit: 'L'
      },
      {
        url: imgUrl+'/savelist2.png',
        title: '行驶里程',
        value: '0.00',
        unit: 'KM'
      },
      {
        url: imgUrl+'/savelist3.png',
        title: '平均油耗',
        value: '0.00',
        unit: 'L/100km'
      },
      {
        url: imgUrl+'/savelist4.png',
        title: '行车时长',
        value: '0',
        unit: '分钟'
      },
      // {
      //   url: imgUrl+'/savelist5.png',
      //   title: '参考油费',
      //   value: '0.00',
      //   unit: '元'
      // },
      {
        url: imgUrl+'/savelist6.png',
        title: '异常项目',
        value: '0',
        unit: ''
      },
      {
        url: imgUrl+'/savelist4.png',
        title: '急加油数',
        value: '0'
      }
    ],
    
    drivingBehavior: [{
      url: imgUrl+'/savelist8.png',
        title: '异常操作',
        value: '0'
      },
      // {
      //   url: imgUrl+'/savelist7.png',
      //   title: '正常行驶',
      //   value: '0'
      // },
      // {
      //   url: imgUrl+'/savelist9.png',
      //   title: '急加油数',
      //   value: '0'
      // }
    ],
    date1: '2018-08-08',
    date2: '2018-08-08',
    nowData: nowDate,
    beforeData: '2018-08-08',
    dayRange: ['', '近三天', '近七天', '近半月'], // 接口中的 type  1： 三天 2：七天 3：十五天
    idx: 0, // 接口中的 type  1： 三天 2：七天 3：十五天
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var time = util.formatTime(new Date()); 
    that.setData({
      userInfo: app.gd.userInfo,
      date1: time ,
      date2: time 
    })
    
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.data.deviceStatus == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未绑定设备，请先绑定设备',
        showCancel: true,
        confirmText: '去绑定',
        confirmColor: '#09bb07',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../bindDevice/bindDevice',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    } else {
      this.getTreasure();
    }
  },
  getTreasureBtn: function() {
    wx.showLoading();
    this.getTreasure();
  },
  getTreasure: function() {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/getTreasure',
      data: {
        uid: app.gd.uid,
        start_time: that.data.date1,
        end_time: that.data.date2,
        type: Number(that.data.idx)
      },
      method: 'POST',
      success: function(res) {
        console.log("省油宝", res);
        if (res.data.code == 1) {
          let rd = res.data.data;
          // 驾驶行为
          that.setData({
            ['drivingBehavior[0].value']: rd.data.play_size,
            // ['drivingBehavior[1].value']: rd.data.minus_size,
            // ['drivingBehavior[2].value']: rd.data.playOil_size,
          })
          // 用户信息
          that.setData({
            user: rd.user
          })
          // 6个方块
          try{
            for (let i = 0; i < that.data.carCountData.length; i++) {
              that.setData({
                ['carCountData[' + i + '].value']: rd.list[i]
              })
            }
          }catch(e){

          }
          //choice
          that.setData({
            date1: rd.choice.start_time,
            date2: rd.choice.end_time,
          })
        } else if (res.data.code == 0) {

        }
      },
      fail: function(res) {},
      complete: function(res) { 
        wx.hideLoading();
      },
    })
  },
  bindDateChange: function(e) {
    var that = this;
    that.setData({
      date1: e.detail.value,
      idx: 0
    })
    wx.showLoading();
    this.getTreasure();
    console.log(that.data.date1);
  },
  bindDateChangeTwo: function(e) {
    var that = this;
    that.setData({
      date2: e.detail.value,
      idx: 0
    })
    wx.showLoading();
    this.getTreasure();
    console.log(that.data.date2);
  },
  dayPickerChange: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      idx: e.detail.value
    })
    if (e.detail.value == 1) {
      let d1 = util.getBeforeDate(3);
      that.setData({
        date1: d1,
        date2: nowDate,
      })
    } else if (e.detail.value == 2) {
      let d1 = util.getBeforeDate(7);
      that.setData({
        date1: d1,
        date2: nowDate,
      })
    } else if (e.detail.value == 3) {
      let d1 = util.getBeforeDate(15);
      that.setData({
        date1: d1,
        date2: nowDate,
      })
    }
    wx.showLoading();
    this.getTreasure()
  },
  navto: function(){
    wx.navigateTo({
      url: '../faultWarning/faultWarning', 
    })
  }
})
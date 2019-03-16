// pages/tailWarn/tailWarn.js
import {
  request as fetch
} from '../../utils/requestPromise.js';
let app = getApp();
let time;
let myDate = new Date();
let util = require('../../utils/util.js');
let nowYY = myDate.getFullYear();
let nowMM = myDate.getMonth() + 1;
let nowDD = myDate.getDate();
let nowDate = nowYY + '-' + nowMM + '-' + nowDD;
let d1 = util.getBeforeDate(60);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    errno: false,
    detail: {},

    date1: nowDate,
    date2: nowDate,
    beforeData: d1,
    nowData: nowDate,
  },
  onLoad: function(options) {
    this._initData()
    /** 短轮询 */
    time = setInterval(() => {
      this._initData()
    }, 5000)
  },
  onUnload: function() {
    clearInterval(time)
  },
  _initData: function() {
    fetch('ubi/Remind/tail', 'POST', {
      uid: app.gd.uid,
      start_time: this.data.date1,
      end_time: this.data.date2
    }).then(res => {
      let {
        data: detail
      } = res.data
      this.setData({
        detail
      })
      // console.log(detail);
    })
  },
  /** 页面销毁 */
  ch: function() {
    this.setData({
      errno: true
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date1: e.detail.value,
    })
    this._initData(); 
  },
  bindDateChangeTwo: function(e) {
    this.setData({
      date2: e.detail.value,
    })
    this._initData(); 
  },
})
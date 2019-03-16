// pages/collisionWarn/collisionWarn.js
import { request as fetch } from '../../utils/requestPromise.js';
let app = getApp();
let currentPage = 1,
    total = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    pageLoading: true,
    winHeight: 667,
    details: {},
    plate: '',
    nodata: false,
    isPrevLoading: false,
    isNextLoading: false,
    isPrev: true, /** 已经第一页 */
    isNext: true, /** 已经最后一页 */

    prevDesc: 1, /** 描述性页数 */
    allDesc: 1

  },
  onLoad: function (options) {
    this._initHeight()
    this._initData()
  },
  _initHeight: function () {
    var that = this;
    /** 高度适应 rpx */
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth,
            di = 375 / clientWidth
        /** 计算列表渲染的 scroll view 高度 */
        var calc = clientHeight * di * 2 + 450;
        
        that.setData({ winHeight: calc });
      }
    });
  },
  _initData: function (page, first = true) {
    this.setData({ isNextLoading: true })
    fetch('ubi/Remind/getCrash', 'POST', {
      uid: app.gd.uid ,
      page: page || 1
    }).then(res => {
      if (res) this.setData({ isNextLoading: false })
      if (res.data.code === 0) { this.setData({ nodata: true }); return; }
      let { list: details, plate, rows } = res.data.data;
      total = rows
      if (currentPage !== 1) this.setData({ isPrev: false })
      if (currentPage === 1) this.setData({ isPrev: true })
      if (currentPage !== rows) this.setData({ isNext: false })
      if (currentPage === rows) this.setData({ isNext: true })
      this.setData({
        details: details[0],
        plate,
        allDesc: rows,
        prevDesc: currentPage
      })
      // console.log(res);
    })
  },
  /** 改变提醒页数 */
  changeInformation: function (e) {
    let { target } = e.currentTarget.dataset
    if (this.data.isNextLoading) return
    switch (target) {
      case 'prev':
        if ( currentPage === 1 ) {
          this.setData({ isPrev: true })
          return
        }
        currentPage--
        this._initData(currentPage)
        break
      case 'next':
        console.log(currentPage, total)
        if (currentPage === total && currentPage !== 1) {
          this.setData({ isNext: true})
          return;
        }
        currentPage++
        this._initData(currentPage)
        break
    }
  },
  /** 忽略全部提醒 */
  ignoreBtn: function () {
    console.log(this.data.nodata)
    if (this.data.nodata) {
      wx.showToast({
        title: '暂无可忽略信息!',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    fetch('ubi/Remind/putLoseCircuit', 'POST', {
      uid: app.gd.uid,
    }).then(res => {
      if (res) {
        wx.hideLoading()
      }
      if (res.data.code === 1) {
        wx.showToast({ title: res.data.msg })
        this._initData()
      }
      console.log(res)
    })
  }
})
// pages/repairShop/repairShop.js
const app = getApp();
let page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    shopList: [], 
  }, 
  onLoad: function(options) {
    page = 1;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      shopInfo: "专属管家店铺"
    })
    this.service();
  },
  service: function() {
    let that = this;
    // app.checkPosition();
    if (page > this.data.rows) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/Remind/shop',
      data: {
        uid: app.gd.uid,
        page: page,
        lat: app.gd.lat,
        lng: app.gd.lng
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading();
        let pageList = that.data.shopList;
        let resList = res.data.data.list;
        console.log(res)
        if (res.data.code == 1) {
          for (var u = 0; u < resList.length; u++) {
            pageList.push(resList[u])
            console.log(pageList)
          }
          that.setData({
            shopList: pageList,
            rows: res.data.data.rows
          })
          page++
        } else if (res.data.code == 0) {
          that.setData({
            shopList: pageList,
            rows: '',
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
  btn: function() {
    wx.navigateBack({
      delta: 1,
    })
  },
  shopDetail: function(e) {
    var sid = e.currentTarget.dataset.sid
    console.log('有没有啊' + e.currentTarget.dataset.sid)
    wx.navigateTo({
      url: '../shopDetail/shopDetail?sid=' + sid,
    })
  },
  selectSkip: function(e) {
    var shopInfo = e.currentTarget.dataset.info; 
    wx.showModal({
      title: '提示',
      content: '当前店铺距您'+ shopInfo.distance +'公里，确认选择吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#888888',
      confirmText: '确定',
      confirmColor: '#09bb07',
      success: (res) => {
        if (res.confirm) {
          this.selectShop(shopInfo);
        }
      },
    })
  },
  // 确定选择店铺后
  selectShop: function(shopInfo) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log(shopInfo)
    prevPage.setData({
      shopInfo: shopInfo
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  onReachBottom: function() {
    this.service();
  },
})
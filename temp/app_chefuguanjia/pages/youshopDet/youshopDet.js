// pages/youshopDet/youshopDet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    text: '暂无评价',
    height: '500rpx',
    sid: '',
    det: '',
    list: [],
    iscanyu: 0
  },
  onLoad: function(options) {
    this.setData({
      sid: options.sid,
    })
  },
  onShow: function() {
    this._getDetail();
    this._getpingjia();
    this._getcanjia();
  }, 
  mapTo: function (e) {
    console.log("mapTo e:");
    var latitude = Number(e.currentTarget.dataset.lat);
    var longitude = Number(e.currentTarget.dataset.lng);
    var name = e.currentTarget.dataset.company;
    var address = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: name,
      address: address
    })
  },
  bohao: function(e) {
    let num = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: num,
    })
  },
  onReachBottom: function() {

  },
  navmaiyou: function(e) {
    let o = JSON.stringify({ ...e.currentTarget.dataset.oil,
      ke: this.data.iscanyu,
      img: this.data.det.shop_image,
      sid: this.data.sid
    });
    wx.navigateTo({
      url: '../maiyou/maiyou?o=' + o,
    })
  },
  _getDetail: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/shopDetails',
      data: {
        oil_shop_id: this.data.sid,
        lat: app.gd.lat,
        lng: app.gd.lng
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          let det = res.data.data;
          this.setData({
            det: det
          })
        } else {

        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  _getpingjia: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/discuss',
      data: {
        oil_shop_id: this.data.sid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            list: res.data.data.list
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  _getcanjia: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/identity',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          iscanyu: res.data
        })
      },
    })
  }
})
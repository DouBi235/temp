// pages/youzhanList/youzhanList.js
const app = getApp();
Page({

  data: {
    li: [],
    iscanyu: '',
    imgUrl: app.gd.imgUrl,
    text: '暂无油站',
    height: '100vh',
  },

  onShow: function() {
    this._getshopList();
    this._getcanjia();
  },

  navdet: function(e) {
    let id = e.currentTarget.dataset.sid
    wx.navigateTo({
      url: '../youshopDet/youshopDet?sid=' + id,
    })
  },
  _getshopList: function() {
    // app.checkPosition();
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/shoplist',
      data: {
        lat: app.gd.lat,
        lng: app.gd.lng,
      },
      method: 'post',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          let list = res.data.data.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].shop_image != null)
              list[i].shop_image = list[i].shop_image[0];
          }
          this.setData({
            li: list
          })
        } else {
          this.setData({
            li: []
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
  },
  mapTo: function (e) {
    console.log("mapTo e:");
    var latitude = Number(e.currentTarget.dataset.lat);
    var longitude = Number(e.currentTarget.dataset.lng);
    var name = e.currentTarget.dataset.shop;
    var address = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: name,
      address: address
    })
  },
})
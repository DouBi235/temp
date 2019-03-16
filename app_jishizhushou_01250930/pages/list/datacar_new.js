const app = getApp()
Page({
  data: {
    carinfo: {},
    brr: [],
    srr: [],
    trr: [],
    bindex: 0,
    sindex: 0,
    tindex: 0,
    curbrand: "",
    curseries: "",
    curtype: ""
  },
  piChange: function(e) {
    var val = e.detail.value
    switch (e.currentTarget.id) {
      case 'brr':
        var bname = this.data.brr[val];
        this.setData({
          curbrand: bname,
          curseries: "",
          curtype: "",
          bindex: val,
          sindex: 0,
          tindex: 0,
          srr: [],
          trr: [],
          carinfo: {},
        })
        this.getCarSeries(bname);
        break;
      case 'srr':
        var bname = this.data.brr[this.data.bindex],
          sname = this.data.srr[val];
        if (!sname) {
          wx.showToast({
            title: '请先选择品牌！',
            mask: true,
            icon: 'none'
          })
          return;
        }
        this.setData({
          curseries: sname,
          curtype: "",
          sindex: val,
          tindex: 0,
          trr: [],
          carinfo: {},
        })
        this.getCarType(bname, sname);
        break;
      case 'trr':
        var bname = this.data.brr[this.data.bindex],
          sname = this.data.srr[this.data.sindex],
          tname = this.data.trr[val];
        if (!tname) {
          wx.showToast({
            title: '请先选择车型！',
            mask: true,
            icon: 'none'
          })
          return;
        }
        this.setData({
          curtype: tname,
          tindex: val,
        })
        this.getcarinfo(bname, sname, tname);
        break;
    }
  },
  getcarinfo: function(brand, series, tname) {
    wx.request({
      url: app.globalData.url + '/worker/Car/getDetail',
      data: {
        'type': tname,
        series: series,
        brand: brand
      },
      success: (res) => {
        //console.log(res.data)
        this.setData({
          carinfo: res.data
        })
      }
    })
  },
  getCarType(brand, series) {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/worker/Car/getType',
      data: {
        brand: brand,
        series: series
      },
      success: (e) => {
        wx.hideLoading()
        var data = e.data,
          temp = [];
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i].type)
        }
        this.setData({
          trr: temp
        })
      }
    })
  },
  getCarSeries(brand) {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/worker/Car/getSeries',
      data: {
        brand: brand
      },
      success: (e) => {
        wx.hideLoading()
        var data = e.data,
          temp = [];
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i].series)
        }
        this.setData({
          srr: temp
        })
      }
    })
  },
  onShow: function() {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/worker/Car/getBrand',
      success: (e) => {
        wx.hideLoading()
        var data = e.data,
          temp = [];
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i].brand)
        }
        this.setData({
          brr: temp
        })
      }
    })
  }
})
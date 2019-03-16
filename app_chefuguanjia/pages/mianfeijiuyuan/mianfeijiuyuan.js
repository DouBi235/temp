const app = getApp();
const urlHeader = app.gd.globalUrl;
let page = 1;
Page({
  data: {
    imgUrl: app.gd.imgUrl,
    listy1: [],
  },
  onLoad: function (options) {
    page = 1;
  },
  onShow: function(e) {
    this._getlist();
  },
  _getlist: function(e) {
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
    var olist = this.data.shops,
      url = 'cbs/Shop/getList2';
    wx.request({
      url: urlHeader + url + "?lat=" + app.gd.lat + "&lng=" + app.gd.lng + "&uid=" + app.gd.uid,
      method: "post",
      data: {
        page: page
      },
      success: (res) => {
        wx.hideLoading(); 
        if (res.data.code == 1) {
          let list = this.data.listy1;
          let resli = res.data.data.list;
          for (let i = 0; i < resli.length; i++) {
            list.push(resli[i]);
          }
          this.setData({
            rows: res.data.data.rows,
            listy1: list,
          })
          page++;
        } else {
          wx.showToast({
            title: '该地区暂无店面',
            icon: false,
            duration: 1500
          })
          this.setData({
            rows: '',
            listy1: [],
          })
        }
      }
    }) 
  },
  callTo: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  onReachBottom: function () {
    this._getlist(page);
  }
})
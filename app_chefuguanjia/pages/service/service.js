const app = getApp();
const urlHeader = app.gd.globalUrl;
const imgUrl = app.gd.imgUrl;
let page = 1;
Page({
  data: {
    imgUrl: app.gd.imgUrl,
    star_1: imgUrl + '/star_1.png',
    star_2: imgUrl + '/star_2.png',
    shops: []
  }, 
  onLoad: function(options) {
    page = 1;
  },
  onShow: function(o) {
    this._getShop();
  },
  //跳转到店铺详情
  skip(e) {
    console.log(e)
    var sid = e.currentTarget.dataset.sid;
    wx.navigateTo({
      url: '../shopDetail/shopDetail?sid=' + sid,
    })
  },
  //预约
  about(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.showModal({
      title: '是否拨打电话?',
      content: phone,
      success: (res) => {
        console.log(res)
        if (res.confirm) {
          console.log(this)
          wx.makePhoneCall({
            phoneNumber: phone
          })
        }
      }
    })
  },
  //获取地理位置附近的店铺店铺 
  _getShop() {
    if (page > this.data.rows) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return ;
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
        wx.request({
          url: urlHeader + 'cb/Index/upCoord',
          method: "GET",
          data: {
            lat: app.gd.lat,
            lng: app.gd.lng,
            uid: app.gd.uid,
          },
        })
        if (res.data.code == 1) {
          let list = this.data.shops;
          let resli = res.data.data.list;
          for (let i = 0; i < resli.length; i++) {
            list.push(resli[i]);
          }
          this.setData({
            rows: res.data.data.rows,
            shops: list,
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
            shops: [],
          })
        }
      }
    })
  },
  onReachBottom: function() {
    this._getShop(page);
  }
})
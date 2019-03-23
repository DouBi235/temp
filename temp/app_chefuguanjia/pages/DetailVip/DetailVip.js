var app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    ifBuy: '',
    nji8f: [{
      bfw9f: '停驶奖励',
      f93hf: '享受人保、太平洋、国任、信达、平安等多家保险公司绿色出行奖励'
    }, {
      bfw9f: '尾气预警',
      f93hf: '尾排实时提醒'
    }, {
      bfw9f: '故障预警',
      f93hf: '参与车辆提供故障预警等服务'
    }, {
      bfw9f: '智慧出行',
      f93hf: '人车互联，出行无忧'
    }, ],
    recommen: '',
    recommenImg: '',
    recommenName: '',
    recommen_unionId: '',
    resrecommenunionId: '',
  },
  onLoad: function(options) {
    var that = this;
    if (options.index) {
      that.setData({
        index: options.index
      })
    }
    this.setData({
      recommen: app.gd.recommen,
      recommen_unionId: app.gd.recommen_unionId,
      status: app.gd.status
    });
    if (app.gd.recommen.code == 1) {
      this.setData({
        recommenImg: app.gd.recommen.detail.head_pic,
        recommenName: app.gd.recommen.detail.nick_name,
      })
    }
    this.ifrecommen();
    // wx.setStorage({
    //   key: 'maskShow',
    //   data: 1,
    // })
    this.getwhetherBuy()
  },

  onReady: function() {},
  ifrecommen: function() {
    if (this.data.recommen.code == 1) { // 
      // 
      this.setData({
        promo_code: this.data.recommen.detail.promo_code,
        infoShow: true
      })
      this.recommenRequest();
    }
  },
  Focus(e) {
    console.log(e)
    this.setData({
      promo_code: e.detail.value
    })
    if (e.detail.value.length >= 6) {
      this.recommenRequest();
    }
  },
  recommenRequest: function() {
    wx.request({
      url: urlHeader + 'ubi/member/getRecommenInfo',
      data: {
        promo_code: this.data.promo_code
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            recommenImg: res.data.data.head_pic,
            recommenName: res.data.data.nick_name,
            resrecommenunionId: res.data.data.recommen_unionId,
            infoShow: true
          })
        } else {
          wx.showModal({
            content: res.data.msg,
            showCancel: true,
            cancelText: '继续',
            cancelColor: '#09bb07',
            confirmText: '更改',
            confirmColor: '#888',
            success: (res) => {
              this.setData({
                infoShow: false,
                recommen_unionId: ''
              })
              if (res.confirm) {
                this.setData({
                  promo_code: '',
                })
              }
            },
          })
        }
      },
    })
  },
  //  首次进入页面后弹窗内的更改点击事件
  hideinfoshow1: function() {
    this.setData({
      promo_code: '',
      infoShow: false
    })
  },
  //  遮罩层防止页面滚动事件
  catchnull: function() {},
  //  首次进入页面后弹窗内的确认点击事件
  hideinfoshow: function() {
    this.setData({
      recommen_unionId: this.data.resrecommenunionId,
      infoShow: false
    })
  },
  getwhetherBuy: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Member/whetherBuy',
      data: {
        unionId: app.gd.unionId,
      },
      method: 'GET',
      success: (res) => {
        this.setData({
          ifBuy: res.data
        })
      },
    })
  },
  okBuy: function() {
    var d = this.data;
    if (d.ifBuy.code == 1) {
      wx.request({
        url: urlHeader + 'ubi/Member/memberpay',
        method: "POST",
        data: {
          uid: app.gd.uid,
          unionId: app.gd.unionId,
          recommen_unionId: d.recommen_unionId,
          type: app.gd.status < 2 ? 1 : 2
        },
        success: (res) => {
          if (res.data.code == 0) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
            })
          } else if (res.data.code == 1) {
            var obj = res.data.data;
            wx.requestPayment({
              timeStamp: obj.timeStamp,
              nonceStr: obj.nonceStr,
              'package': obj.package,
              signType: obj.signType,
              paySign: obj.paySign,
              complete: (res2) => {
                if (res2.errMsg == 'requestPayment:ok') {
                  let mid = obj.id;
                  wx.request({
                    url: app.gd.globalUrl + 'ubi/Member/isDarw',
                    data: {
                      uid: app.gd.uid
                    },
                    method: 'POST',
                    success: function(res) {
                      console.log(res)
                      if (res.data.code == 1) {
                        app.gd.status = 1;
                        wx.navigateTo({
                          url: '../okBuyVip/okBuyVip?mid=' + mid,
                        })
                      } else {
                        app.gd.status = 2;
                        wx.navigateTo({
                          url: '../okBuyVip/okBuyVip?mid=' + mid,
                        })
                      }
                    },
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: this.data.ifBuy.msg,
        showCancel: false,
      })
    }
  },
})
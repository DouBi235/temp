// order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    // 未支付数据
    npay: [],
    // 已支付数据
    pay: [],
    binli: app.gd.imgUrl + '/binli.jpg',
    uid: '', //用户id
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: app.gd.uid,
      openid: app.gd.openid
    })
    var that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/unpaid',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: function(e) {
        console.log('获取未支付订单', e);
        if (e.data.code == 1) {
          that.setData({
            npay: e.data.data.list
          })
        } else if (e.data.code == 0) {
          that.setData({
            npay: []
          })
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/paid',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: function(e) {
        if (e.data.code == 1) {
          that.setData({
            pay: e.data.data.list,
          })
        } else if (e.data.code == 0) {
          that.setData({
            pay: []
          })
          // wx.showToast({
          //   title: e.data.code ,
          //   icon: 'none',
          //   duration: 1500,
          // })
        }
      }
    })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },

  // 用户微信支付
  zhifu: function(e) { 
    var that = this
    wx.request({
      url: app.gd.globalUrl + 'ubi/Payment/pay',
      method: 'POST',
      data: {
        uid: app.gd.uid,
        openid: this.data.openid,
        id: e.currentTarget.dataset.id
      },
      success: function(payres) {
        console.log(payres)
        var par = payres.data.data;
        wx.requestPayment({
          'timeStamp': par.timeStamp,
          'nonceStr': par.nonceStr,
          'package': par.package,
          'signType': 'MD5',
          'paySign': par.paySign,
          'success': function(res) {
            console.log("weixinzhifu  chenggong")
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
            wx.request({
              url: app.gd.globalUrl + 'ubi/My/unpaid',
              method: 'POST',
              data: {
                uid: app.gd.uid
              },
              success: function(e) {
                // console.log('获取未支付订单', e);
                if (e.data.code == 1) {
                  that.setData({
                    npay: e.data.data.list
                  })
                } else if (e.data.code == 0) {
                  that.setData({
                    npay: []
                  })
                  // wx.showToast({
                  //   title: e.data.msg,
                  //   icon: 'none',
                  //   duration: 1500,
                  // })
                }
                that.setData({
                  npay: e.data.data.list
                })
              }
            })
            wx.request({
              url: app.gd.globalUrl + 'ubi/My/paid',
              method: 'POST',
              data: {
                uid: app.gd.uid
              },
              success: function(e) {
                // console.log('获取已支付订单', e);
                if (e.data.code == 1) {
                  that.setData({
                    pay: e.data.data.list,
                  })
                } else if (e.data.code == 0) {
                  that.setData({
                    pay: []
                  })
                  // wx.showToast({
                  //   title: e.data.msg,
                  //   icon: 'none',
                  //   duration: 1500,
                  // })
                }
              }
            })
          },

          'fail': function(res) {
            console.log("weixinzhifu  shibai")
          }
        })
      },
      fail: function(res) {}
    })

  },

  swichNav: function(e) {  
    var that = this;

      
    if (this.data.currentTab === e.target.dataset.current) {   
      return false;  
    } else {   
      that.setData({    
        currentTab: e.target.dataset.current   
      })  
    }
  },
})
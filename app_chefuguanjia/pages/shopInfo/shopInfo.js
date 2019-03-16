var app = getApp(),
  urlHeader = app.gd.globalUrl,
  imgUrl = app.gd.imgUrl;
Page({
  data: {
    imgUrl: app.gd.imgUrl,
    workerArr: [], //技师列表
    serverArr: [], //活动列表
    cmtArr: [], //评论列表
    workerNum: 0,
    page: 1,
    crStar: imgUrl + '/cbby-0032.png',
    star: imgUrl + '/cbby-0031.png',
    hasmoreData: false,
    evaluate: ""
  },
  onLoad: function(options) {
    var that = this,
      sid = options.sid;
    console.log(options.sid)
    that.setData({
      sid: sid
    });
    //获取店铺基本信息
    wx.request({
      url: urlHeader + 'cb/shop/getDetail',
      data: {
        sid: sid
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 1) {
          console.log(res)
          that.setData({
            shopInfo: res.data.data
          });
        }
      }
    });
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        that.setData({
          uid: res.data
        })
      },
    })

    //获取服务店铺技师
    wx.request({
      url: urlHeader + 'cb/shop/getTns',
      data: {
        sid: sid
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            workerArr: []
          });
        }
        if (res.data.code == 1) {
          that.setData({
            workerNum: res.data.data.count,
            workerArr: res.data.data.list
          });
        }
      }
    });
    //获取关注用户
    wx.request({
      url: urlHeader + 'cb/Shop/getAttent',
      data: {
        sid: sid
      },
      success: function(res) {

      }
    })
    //获取评论数统计
    wx.request({
      url: urlHeader + 'cb/shop/countComs',
      data: {
        sid: sid
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 1) {
          that.setData({
            score: res.data.data
          });
        }
        if (res.data.code == 0) {
          wx.showModal({
            title: '获取评论出错',
            content: res.data.msg,
            showCancel: false
          })
          that.setData({
            score: {
              score: 0,
              shop_star: 0,
              tn_star: 0
            }
          })
        }
      }
    });
    that.getComs();
  },
  onShow: function() {
    var that = this;
  },
  //预约
  about: function() {
    var that = this;
    wx.showModal({
      title: '是否拨打电话？',
      content: that.data.shopInfo.serphone,
      success: function(res) {
        var skip = res.confirm;
        if (skip == true) {
          wx.makePhoneCall({
            phoneNumber: that.data.shopInfo.serphone,
          })
        }
      }
    })
  },
  //点击显示地图
  mapBlock: function() {
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.shopInfo.lat),
      longitude: Number(that.data.shopInfo.lng),
      scale: 16,
      name: that.data.shopInfo.company,
      success: function(res) {
        console.log(res);
      },
      fial(err) {
        console.log(err);
      }
    })
  },
  //请求评论列表
  getComs: function() {
    var that = this,
      sid = that.data.sid,
      olist = that.data.cmtArr;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: urlHeader + 'cb/shop/getComs',
      data: {
        sid: sid,
        page: that.data.page
      },
      success: function(res) {
        console.log(res);
        if (res.data.code == 1) {

          var arr = res.data.data.list;
          for (var i = 0; i < arr.length; i++) {
            var ar = arr[i].phone.split('');
            for (var j = 0; j < ar.length; j++) {
              if (j > 2 && j < 7) {
                ar[j] = '*';
              }
            }
            arr[i].phone = ar.join('');
          }
          wx.hideLoading();
          if (arr.length == 10) {
            that.setData({
              cmtArr: olist.concat(arr),
              hasMoreData: true,
              page: that.data.page + 1
            });
          } else {
            that.setData({
              cmtArr: olist.concat(arr),
              hasMoreData: false
            })
          }
        }
        if (res.data.code == 0) {
          wx.hideLoading();
          that.setData({
            cmtArr: [],
            evaluate: '暂无车主评价'
          });
          console.log(res.data.msg)
        }
      }
    });
  },
  onReachBottom: function() {
    var that = this;
    if (that.data.hasMoreData) {
      that.getComs();
    } else {
      wx.showToast({
        title: '没有更多数据了哦',
        duration: 500,
      })
    }
  },
  onShareAppMessage: function() {
    var that = this;
    return {
      title: '惠生活,邦保养!',
      desc: '惠生活,邦保养!',
      path: '/pages/index/index?uid=' + that.data.uid,
      success(res) {
        console.log(res)
      }
    }
  }
})
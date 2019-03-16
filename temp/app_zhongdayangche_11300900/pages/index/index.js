//index.js
const app = getApp();
var viewPage = 1;
var page = 1; 
Page({
  data: {
    city: '',
    userInfo: app.globalData.userInfo,
    transparentlayer: !app.globalData.isopen,  // 透明层的显示
    loginlayer: !app.globalData.uid, // 授权框的显示
    positionlayer: false, // 跳转授权定位页的显示
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    keywords: '',
    scrollTop: 0,
    handpickList: [], // 仲达精选 商品列表
    handpickRows: 1,
    prefectureList: [],
    prefectureRows: 1,
    currentTop:0,
    scrollstate: 0, 
  },
  onLoad: function() {
    viewPage = 1;
    page = 1;
    var that = this;
    // 判断登陆
    if (app.globalData.uid) {
      this.setData({
        transparentlayer: false,
        loginlayer: false
      })
      that.togetlocal();
    } else {
      wx.getUserInfo({ //授权后，直接登录
        success: res => {
          // // console.log("授权后第二次登陆",res)
          app.globalData.userInfo = res.userInfo 
          that.tologin(res);
          this.setData({
            transparentlayer: false,
            loginlayer: false
          })
        }
      })
    };
  },
  onShow: function() {
    // wx.getStorage({
    //   key: 'uid',
    //   success: function(res) {
    //     wx.getLocation({
    //       type: 'wgs84',
    //       success: function (res) {
    //         wx.request({
    //           url: app.globalData.globalUrl + '/st/index/upCoord',
    //           data: {
    //             uid: res.data,
    //             lng: res.longitude,
    //             lat: res.latitude
    //           },
    //           success: function (res) {
    //             // console.log("更新位置信息结果", res);
    //           }
    //         })
    //       }
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // }) 
  },
  onReady: function() {
    var that = this;
    // this.scrolladd(that);
  },
  onPageScroll: function(e) { 
    if(e.scrollTop > this.data.currentTop ){
      // hide
      this.setData({
        scrollstate: 2
      })
    } else if (e.scrollTop < this.data.currentTop ) {
      // show 
      this.setData({
        scrollstate: 1
      })
    }
    this.setData({
      currentTop: e.scrollTop,
    })
  },
  onPullDownRefresh: function() {
    var that = this;
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();
    page = 1;
    wx.request({
      url: app.globalData.globalUrl + '/st/main/unSignList',
      data: {
        uid: app.globalData.uid,
        page: page
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        if (res.data.code == 1) {
          var thatlist = []
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            prefectureList: thatlist,
            prefectureRows: resrows
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        page++;
      } 
    });
  },
  onReachBottom: function() {
    var that = this;
    // console.log("主页上拉加载");
    that.prefectureFn();
  },
  getUserInfo: function(e) {
    var that = this;
    that.setData({
      loginlayer: false
    })
    if (e.detail.userInfo) {
      // console.log("授权成功，",e);
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
      })
      var ed = e.detail;
      that.tologin(ed);
    } else {
      // console.log("授权不成功");
      return false;
    }
  },
  tologin: function(e) {
    var that = this;
    // console.log("eeee",e)
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.globalUrl + '/st/index/login',
            data: {
              code: res.code,
              nick_name: app.globalData.userInfo.nickName,
              head_pic: app.globalData.userInfo.avatarUrl,
              sex: app.globalData.userInfo.gender,
              encryptedData: e.encryptedData,
              errMsg: e.errMsg,
              iv: e.iv,
              rawData: e.rawData,
              signature: e.signature
            },
            success: function (data) {
              // console.log("访问登录接口的信息", data)
              app.globalData.uid = data.data.data.uid;
              wx.setStorage({
                key: "uid",
                data: data.data.data.uid
              });
              that.togetlocal()
            },
            complete: function() {
              wx.hideLoading();
            }
          });
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  togetlocal: function() {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        wx.getLocation({
          altitude: false,
          type: 'wgs84',
          success: function (res) {
            wx.request({
              url: app.globalData.globalUrl + '/st/index/upCoord',
              data: {
                uid: app.globalData.uid,
                lng: res.longitude,
                lat: res.latitude
              },
              success: function (updateres) {
                that.setData({
                  city: updateres.data.data
                })
                console.log(updateres);
                // console.log("更新位置信息结果", updateres);
              }
            })
            that.setData({
              transparentlayer: false,
              positionlayer: false,
            });
            that.handpickFn();
            that.prefectureFn();
          },
          fail: function () {
            that.setData({
              positionlayer: true
            })
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })  
  },
  inputKeywords: function(e) {
    // console.log("inputKeywords Fn")
    var that = this;
    // // console.log(e.detail.value)
    that.setData({
      keywords: e.detail.value
    })
  },
  toSearchPage: function() {
    // console.log("toSearchPage Fn")
    var that = this;
    // // console.log(that.data.keywords)
    wx.navigateTo({
      url: '../search/search?keywords=' + that.data.keywords
    })
  },
  toProductDet: function(e) {
    // console.log("toProductDet Fn", e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDet/productDet?id=' + id,
    })
  },
  handpickFn: function() {
    // console.log("handpickFn Fn");
    var that = this;
    if (that.data.handpickRows < viewPage) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    };
    // wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/signList',
      data: {
        uid: app.globalData.uid,
        page: viewPage
      },
      success: function(res) {
        wx.hideLoading();
        // console.log("仲达精选接口返回信息：", res)
        if (res.data.code == 1) {
          var thatlist = that.data.handpickList;
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            handpickList: thatlist,
            handpickRows: resrows
          })
          viewPage++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none', 
          })
        }
        // console.log(that.data.handpickList)
      }
    });
  },
  prefectureFn: function() {
    // console.log("prefectureFn Fn");
    var that = this;
    if (that.data.prefectureRows < page) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    };
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/unSignList',
      data: {
        uid: app.globalData.uid,
        page: page
      },
      success: function(res) {
        wx.hideLoading();
        // console.log("产品专区接口返回信息：", res)
        if (res.data.code == 1) {
          var thatlist = that.data.prefectureList;
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            prefectureList: thatlist,
            prefectureRows: resrows
          })
          // console.log("page++", resrows)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
        page++;
        // console.log(that.data.prefectureList)
      }
    });
  },
  showLoginLayer: function() {
    if (!app.globalData.userInfo) {
      this.setData({
        loginlayer: true
      })
    } else {
      this.setData({
        positionlayer: true
      })
    }
  },
  hideLoginLayer: function() {
    this.setData({
      loginlayer: false
    })
  },
  reopenpage: function(e) {
    var that = this;
    if (e.detail.authSetting["scope.userLocation"]) {
      this.setData({
        transparentlayer: false,
        positionlayer: false,
      });
      that.handpickFn();
      that.prefectureFn();
    }
  }, 
  layerbackFn: function(){

  },
  navigateToOther: function(e) {
    var appid = e.currentTarget.dataset.appid
    if(appid == ''){
      wx.navigateTo({
        url: '../wait/wait',
      })
    }
    wx.navigateToMiniProgram({
      appId: appid,
      path: 'pages/index/index?id=' + appid,
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  scrolladd: function(that) {
    // console.log("scrolladd")
    if (that.data.handpickRows < viewPage) {
      that.setData({
        scrollTop: 0
      })
      clearTimeout();
    }
    mytimer = setTimeout(function() {
      that.setData({
        scrollTop: that.data.scrollTop + 2
      })
      that.scrolladd(that);
    },30)
  }, 
  scrolltoupper: function() {
    var that = this;
    viewPage = 1;
    // console.log("gengxin")
    wx.request({
      url: app.globalData.globalUrl + '/st/main/signList',
      data: {
        uid: app.globalData.uid,
        page: viewPage
      },
      success: function (res) { 
        // // console.log("仲达精选接口返回信息：", res)
        if (res.data.code == 1) {
          var thatlist = []
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            handpickList: thatlist,
            handpickRows: resrows
          })
          viewPage++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        } 
      } 
    });
  },
  scrolltolower: function() {
    this.handpickFn();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
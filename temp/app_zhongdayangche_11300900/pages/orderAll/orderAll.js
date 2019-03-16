// pages/orderAll/orderAll.js
var app = getApp();
var utils = require('../../utils/util.js');
var pageall = 1;
var pageing = 1;
var pageed = 1

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    winHeight: '',
    currentTab: 0,
    orderList: [],
    orderListing: [],
    orderListed: [],
    rows: '',
    rowsing: '',
    rowsed: '',
    totalmoney: ''
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) { 
    var that = this;
    pageall = 1; pageing = 1; pageed = 1;
    // console.log(utils.formatTime("1533979500"));
    // console.log(utils.timestampToTime("1533979500"))
    // console.log(utils.timestampToDate("1533979500"))
    // that.loadMore(that);
    wx.request({
      url: app.globalData.globalUrl + '/st/order/allList',
      data: {
        uid: app.globalData.uid,
        page: pageall
      },
      success: function (res) {
        wx.hideLoading()
        console.log("全部订单列表 返回结果：",res)
        if (res.data.code == 1) {
          var thatlist = []
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderList: thatlist,
            rows: res.data.data.rows
          })
          pageall++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    console.log("用户的登陆信息", app.globalData.uid)
    console.log("订单列表1", that.data.orderList)
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/order/ingList',
      data: {
        uid: app.globalData.uid,
        page: pageing
      },
      success: function (res) {
        console.log("orderAll onReady 进行中列表返回结果",res)
        if (res.data.code == 1) {
          var thatlist = []
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListing: thatlist,
            rowsing: res.data.data.rows
          })
          pageing++;
        }
      }
    }),
    wx.request({
      url: app.globalData.globalUrl + '/st/order/undList',
      data: {
        uid: app.globalData.uid,
        page: pageed
      },
      success: function (res) {
        console.log("orderAll onReady 待评价返回结果：",res)
        if (res.data.code == 1) {
          var thatlist = [];
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListed: thatlist,
            rowsed: res.data.data.rows
          })
          pageed++;
        }
      }
    })
  },

	/**
	 * 生命周期函数--监听页面显示
	 */
  onShow: function () {

  },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
  onHide: function () {

  },

	/**
	 * 生命周期函数--监听页面卸载
	 */
  onUnload: function () {

  },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
  onPullDownRefresh: function () {
    console.log("page refresh")
  },

	/**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {
    console.log("orderAll onReachBottom")
  },

	/**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () {

  },
  switchTab: function (e) {
    var that = this;
    console.log("switchTab has been executed",e);
    this.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current == 0) {
      pageall = 1;
      wx.request({
        url: app.globalData.globalUrl + '/st/order/allList',
        data: {
          uid: app.globalData.uid,
          page: pageall
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == 1) {
            var thatlist = []
            var list = res.data.data.list;
            for (var i = 0; i < list.length; i++) {
              thatlist.push(list[i]);
            }
            that.setData({
              orderList: thatlist,
              rows: res.data.data.rows
            })
            pageall++;
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            var thatlist = [];
            that.setData({
              orderListed: thatlist,
            }) 
          }
        }
      })
    } else if (e.detail.current == 1) {
      pageing = 1;
      wx.request({
        url: app.globalData.globalUrl + '/st/order/ingList',
        data: {
          uid: app.globalData.uid,
          page: pageing
        },
        success: function (res) { 
          if (res.data.code == 1) {
            var thatlist = []
            var list = res.data.data.list;
            for (var i = 0; i < list.length; i++) {
              thatlist.push(list[i]);
            }
            that.setData({
              orderListing: thatlist,
              rowsing: res.data.data.rows
            })
            pageing++;
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            var thatlist = [];
            that.setData({
              orderListed: thatlist,
            }) 
          }
        }
      })
    } else if (e.detail.current == 2) {
      pageed = 1;
      wx.request({
        url: app.globalData.globalUrl + '/st/order/undList',
        data: {
          uid: app.globalData.uid,
          page: pageed
        },
        success: function (res) { 

          console.log("daipingjia:", res)
          if (res.data.code == 1) {
            var thatlist = [];
            var list = res.data.data.list;
            for (var i = 0; i < list.length; i++) {
              thatlist.push(list[i]);
            }
            that.setData({
              orderListed: thatlist,
              rowsed: res.data.data.rows
            })
            pageed++;
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            }) 
            var thatlist = [];
            that.setData({
              orderListed: thatlist, 
            }) 
          }
        }
      })
    }
  },
  scrolltoupper: function () {
    console.log("scrollrefresh execution");
    var that = this;
    pageall = 1;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/order/allList',
      data: {
        uid: app.globalData.uid,
        page: pageall
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        console.log("全部订单列表 刷新 返回结果：",res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '刷新成功',
            icon: '',
            duration: 1500
          }) 
          var thatlist = [];
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderList: thatlist,
            rows: res.data.data.rows
          })
          pageall++;
        }
      }
    })
  },
  scrolltouppering: function () {
    console.log("scrollrefresh execution");
    var that = this;
    pageing = 1;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/order/ingList',
      data: {
        uid: app.globalData.uid,
        page: pageing
      },
      success: function (res) {
        wx.hideNavigationBarLoading(); 
        console.log("进行中列表刷新返回结果：",res)
        if (res.data.code == 1) { 
          wx.showToast({
            title: '刷新成功',
            icon: '',
            duration: 1500
          })
          var thatlist = [];
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListing: thatlist,
            rowsing: res.data.data.rows
          })
          pageing++;
        }
      }
    })
  },
  scrolltouppered: function () {
    console.log("scrollrefresh execution");
    var that = this;
    pageed = 1;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/order/undList',
      data: {
        uid: app.globalData.uid,
        page: pageed
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        if (res.data.code == 1) {
          wx.showToast({
            title: '刷新成功',
            icon: '',
            duration: 1500
          })
          var thatlist = [];
          var list = res.data.data.list;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListed: thatlist,
            rowsed: res.data.data.rows
          })
          pageed++;
        }
      }
    })
  },
  scrolltolower: function () {
    console.log("scrollload execution");
    var that = this;
    that.loadMore(that);
  },
  scrolltolowering: function () {
    console.log("scrollload execution");
    var that = this;
    that.loadMoreing(that);
  },
  scrolltolowered: function () {
    console.log("scrollload execution");
    var that = this;
    that.loadMoreed(that);
  },
  clickTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  },
  callTo: function (e) {
    var currentPhone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: currentPhone
    })
  },
  mapTo: function (e) {
    console.log("mapTo e:",e);
    var latitude = Number(e.currentTarget.dataset.lat);
    var longitude = Number(e.currentTarget.dataset.lng);
    var name = e.currentTarget.dataset.company;
    var address = e.currentTarget.dataset.city + e.currentTarget.dataset.county + e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: latitude, 
      longitude: longitude, 
      scale: 18,
      name: name,
      address: address
    })
  },
  loadMore: function (that) {
    // console.log(app.globalData.globalUrl);
    var that = that;
    if (that.data.rows < pageall) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.showLoading()
    wx.request({
      url: app.globalData.globalUrl + '/st/order/allList',
      data: {
        uid: app.globalData.uid,
        page: pageall
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.code == 1) {
          var thatlist = that.data.orderList
          var list = res.data.data.list;
          var resrows = res.data.data.rows;
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderList: thatlist,
            rows: resrows
          })
          pageall++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      }
    })
  },
  loadMoreing: function (that) {
    // console.log(app.globalData.globalUrl);
    var that = that;
    if (that.data.rowsing < pageing) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/order/ingList',
      data: {
        uid: app.globalData.uid,
        page: pageing
      },
      success: function (res) {
        wx.hideLoading()
        console.log("进行中列表 加载更多事件返回结果：",res)
        if (res.data.code == 1) {
          var thatlist = that.data.orderListing;
          var list = res.data.data.list; 
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListing: thatlist
          })
          pageing++;
        } else { 
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  loadMoreed: function (that) {
    // console.log(app.globalData.globalUrl);
    var that = that;
    if (that.data.rowsed < pageed) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.showLoading()
    wx.request({
      url: app.globalData.globalUrl + '/st/order/undList',
      data: {
        uid: app.globalData.uid,
        page: pageed
      },
      success: function (res) {
        wx.hideLoading()
        console.log("orderAll 待评价列表 返回结果：",res)
        if (res.data.code == 1) {
          var thatlist = that.data.orderListed
          var list = res.data.data.list; 
          for (var i = 0; i < list.length; i++) {
            thatlist.push(list[i]);
          }
          that.setData({
            orderListed: thatlist
          })
          pageed++;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})
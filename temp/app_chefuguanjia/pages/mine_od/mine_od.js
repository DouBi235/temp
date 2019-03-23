// mine_od.js
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
    // 已预约列表
    list1: [],
    // 已确认列表
    list2: [],
    // 已超时列表
    list3: [],
    binli: app.gd.imgUrl + '/binli.jpg',
    uid: '', //用户id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      uid: app.gd.uid
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/reserved',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: function(e) {
        console.log(e)
        console.log('已预约', e)
        if (e.data.code == 0) {
          that.setData({
            list1: []
          })
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1500,
          })
        } else {
          that.setData({
            list1: e.data.data.list
          })
          var gettime, yy, mm, dd, formatTime, label;
          for (var i = 0; i < that.data.list1.length; i++) {
            gettime = that.data.list1[i].make;
            label = 'list1[' + i + '].time'
            // console.log('具体时间为', gettime)
            yy = gettime.substring(0, 4);
            mm = gettime.substring(5, 7);
            dd = gettime.substring(8, 10);
            formatTime = [yy, mm, dd];
            // console.log(formatTime,'formatTime');
            that.setData({
              [label]: formatTime
            })
          }
        }
      }
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/confirmed',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: function(e) {
        console.log('已确认', e)
        if (e.data.code == 0) {
          that.setData({
            list2: []
          })
          // wx.showToast({
          //   title: e.data.msg,
          //   icon: 'none',
          //   duration: 1500,
          // })
        } else {
          that.setData({
            list2: e.data.data.list
          })
          var gettime, yy, mm, dd, formatTime, label;
          for (var i = 0; i < that.data.list2.length; i++) {
            gettime = that.data.list2[i].make;
            label = 'list2[' + i + '].time'
            // console.log('具体时间为', gettime)
            yy = gettime.substring(0, 4);
            mm = gettime.substring(5, 7);
            dd = gettime.substring(8, 10);
            formatTime = [yy, mm, dd];
            // console.log(formatTime,'formatTime');
            that.setData({
              [label]: formatTime
            })
          }
        }
      }
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/My/timeout',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: function(e) {
        console.log('已超时', e)
        if (e.data.code == 0) {
          that.setData({
            list3: []
          })
          // wx.showToast({
          //   title: e.data.msg,
          //   icon: 'none',
          //   duration: 1500,
          // })
        } else {
          that.setData({
            list3: e.data.data.list
          })
          var gettime, yy, mm, dd, formatTime, label;
          for (var i = 0; i < that.data.list3.length; i++) {
            gettime = that.data.list3[i].make;
            label = 'list3[' + i + '].time'
            // console.log('具体时间为', gettime)
            yy = gettime.substring(0, 4);
            mm = gettime.substring(5, 7);
            dd = gettime.substring(8, 10);
            formatTime = [yy, mm, dd];
            // console.log(formatTime,'formatTime');
            that.setData({
              [label]: formatTime
            })
          }
        }
      }
    })
    // 高度自适应
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
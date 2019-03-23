// pages/diagnostics/diagnostics.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diagItem: [],
    btnShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.data.deviceStatus == 0) {
      wx.showModal({
        title: '提示',
        content: '您还未绑定设备，请先绑定设备',
        showCancel: true,
        confirmText: '去绑定',
        confirmColor: '#09bb07',
        success: function(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../bindDevice/bindDevice',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    } else {
      // 每天只调用一次
      let sd = wx.getStorageSync("diagnosticsInit");
      let td = new Date().toLocaleDateString();
      if (sd != td) {
        // 显示 
        this.pageList();
      }else{
        let d = wx.getStorageSync("diagItem") 
        this.setData({
          diagItem: d,
          btnShow: true
        }) 
      }
    }
  },
  pageList: function() {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/getCheck',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        console.log("诊断页面返回数据", res) 
        if (res.data.code == 0) {
          that.setData({
            diagItem: []
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        } else if (res.data.code == 1) {
          that.setData({
            diagItem: res.data.data,
            btnShow: true
          }) 
          let td = new Date().toLocaleDateString();
          wx.setStorageSync("diagnosticsInit", td) 
          wx.setStorageSync("diagItem", res.data.data)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  ignoreEvent:function(e){
    let sd = wx.getStorageSync("diagItem"),ed=e.currentTarget.dataset.id;
    for (var key in sd) {
      if (sd[key].id == ed) {
        console.log(sd[key].id,ed)
        sd[key].ExceptionCount = 0; 
        wx.setStorageSync("diagItem", sd) 
        this.setData({
          diagItem: wx.getStorageSync("diagItem")
        })
        console.log(this.data.diagItem)
      }
    }  
    wx.request({
      url: app.gd.globalUrl + 'ubi/Remind/ignore',
      data: { id: ed,uid: app.gd.uid}, 
      method: 'POST', 
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  diagnosisBtn: function() {
    let that = this;
    wx.showLoading({
      title: '',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/moAccord',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        console.log("点击诊断按钮返回数据", res)
        that.setData({
          diagItem: res.data.data
        })
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '',
            duration: 1500,
          })
        } else if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
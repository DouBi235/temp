// message.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    // 消息id
    mid: '',
    // 已读信息
    readList: [],
    readred: 0,
    // 未读信息
    unreadList: [],
    tongred: 0,
    uid: '', //用户id
  },

  bindMsg_dt: function(e) {
    let that = this;
    console.log('获取消息id', e.currentTarget.id);
    var mid = e.currentTarget.id
    console.log('获取消息id', mid);
    wx.navigateTo({
      url: '../message_dt/message_dt?mid=' + mid + '&uid=' + app.gd.uid
    })
  },

  bindMsg_rdt: function(e) {
    console.log('获取消息id', e.currentTarget.id);
    var mid = e.currentTarget.id
    console.log('获取消息id', mid);
    wx.navigateTo({
      url: '../message_rdt/message_rdt?mid=' + mid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        console.log('zz', that.data.winHeight)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.Unreadnews();
    this.Readnews();
  },
  Unreadnews() { //获取未读的消息
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/read',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: res => {
        if (res.data.code == 1) {
          console.log(res)
          let count = 0,
            li = res.data.data.list;
          for (let i = 0; i < li.length; i++) {
            if (li[i].status == 0) {
              count++;
            }
          }
          this.setData({
            unreadList: li,
            tongred: res.data.data.count
          })
        }
      }
    })
  },
  Readnews() {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/informList',
      method: 'POST',
      data: {
        uid: app.gd.uid
      },
      success: res => {
        if (res.data.code == 1) {
          let count = 0,
            li = res.data.data.list;
          for (let i = 0; i < li.length; i++) {
            if (li[i].is_read == 0) {
              count++;
            }
          }
          this.setData({
            readList: li,
            readred: res.data.data.count
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
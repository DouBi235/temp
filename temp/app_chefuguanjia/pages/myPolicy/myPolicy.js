// pages/myPolicy/myPolicy.js
const app = getApp(),
  url = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    PolicyList: [], //保单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: app.gd.uid
    })
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
    this.PolicyData()
  },
  PolicyData() {
    console.log(this.data.uid)
    wx.request({
      url: url + 'ubi/My/policyInfo',
      method: 'POST',
      data: {
        uid: this.data.uid
      },
      success: res => {
        if (res.data.code == 1) {
          console.log(res)
          var data = res.data.data.data,
            imgList = [], 
            name = ['车牌照', '行驶证', '保单首页', '商业险', '强制险'];
          for (var i = 0; i < data.img.length; i++) {
            console.log(data.img[i])
            imgList.push({
              src: data.img[i],
              name: name[i]
            })
          }

          this.setData({
            PolicyList: res.data.data.data,
            imgList: imgList
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: e => {
              if (e.confirm) {
                wx.switchTab({
                  url: '../personal/personal',
                })
              }
            }
          })
        }
      }
    })
  },
  SeeDetails() { //审核未通过,点击查看详情
    wx.navigateTo({
      url: '../RejectDetails/RejectDetails?uid=' + this.data.uid + '&pid=' + this.data.PolicyList.pid,
    })
  },
  Submission() { //点击重新提交审核
    wx.navigateTo({
      url: '../upload/upload?uid=' + this.data.uid,
    })
  },
  replacePolicy() { //如果用户保单过期,让用户更换保单
    wx.navigateTo({
      url: '../upload/upload?uid=' + this.data.uid,
    })
  },
  Originalmap(e) { //点击拍照实例,查看原图
    console.log(e)
    var current = e.currentTarget.dataset.src,
      Photograph = e.currentTarget.dataset.list,
      imgList = [];
    for (var i = 0; i < Photograph.length; i++) {
      imgList.push(Photograph[i].src)
    }
    console.log(Photograph)
    wx.previewImage({
      current: current,
      urls: imgList
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
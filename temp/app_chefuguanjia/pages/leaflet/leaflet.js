// pages/leaflet/leaflet.js 
let canvstoimg = null,
  close = null;
let timer = 0;
const app = getApp(),
  urlHeader = app.gd.globalUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    threeData: {},
    tableData: [],
    activityInfo: [],
    loopData: [],
    codeHide: true,
    qrcode_url: '', // 后台二维码地址
    qrcode_path: '', // 二维码本地路径
    head_pic_url: '',
    head_pic_path: '',
    username: '',
    bg_url: app.gd.imgUrl + '/leaflet.png', // 背景图路径 
    bi: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getSystemInfo({
      success: res => {
        let {
          screenWidth
        } = res;
        this.setData({
          bi: 750 / screenWidth
        })
        console.log("比例", this.data.bi)
      },
      fail: err => console.log(err)
    })
  },
  onShow: function() {
    this.getNumber();
    this.rwardList();
    this.getActivityInfo();
  },
  getNumber: function() {

    wx.request({
      url: urlHeader + 'ubi/Popularize/getNumber',
      data: {
        // uid: 19
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          threeData: res.data.data
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  rwardList: function() {

    wx.request({
      url: urlHeader + 'ubi/Popularize/rwardList',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          tableData: res.data.data
        })
        // if (res.data.data.length > 7) {
        this.loop();
        // }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  switchtab: function() {
    // wx.switchTab({
    //   url: '../extension/extension',
    // })
    wx.switchTab({
      url: '../spread/spread',
    })
  },
  getActivityInfo: function() {

    wx.request({
      url: urlHeader + 'ubi/Popularize/getActivityInfo',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          activityInfo: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  loop: function() {

    this.setData({
      loopData: this.data.tableData.slice(0, 7)
    })
    if (this.data.tableData.length > 7 && timer != 0) {
      timer = setInterval(function() {
        let arr = this.data.tableData,
          arr1 = [];
        arr.push(this.data.tableData.shift());
        arr1 = arr.slice(0, 7);
        this.setData({
          tableData: arr,
          loopData: arr1
        })
      }, 2000)
    }
  },
  buildImg: function() {

    wx.request({
      url: urlHeader + 'ubi/Popularize/judgeUser',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 0) {
          wx.showModal({
            title: '',
            content: res.data.msg,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#888',
            confirmText: '参与UBI',
            confirmColor: '#09bb01',
            success: (res) => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../DetailVip/DetailVip',
                })
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res.data.code == 1) {
          // 显示 
          this.setData({
            codeHide: false,
            qrcode_url: res.data.data.qrcode,
            head_pic_url: res.data.data.head_pic,
            username: res.data.data.name,
            promo_code: res.data.data.promo_code
          })
          this.switchPath()
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  switchPath: function() {
    // 获取qrcode图片本地路径

    wx.getImageInfo({
      src: this.data.qrcode_url,
      success: res => {
        this.setData({
          qrcode_path: res.path
        })
        wx.getImageInfo({
          src: this.data.bg_url,
          success: res => {
            this.setData({
              bg_url: res.path
            })
            wx.getImageInfo({
              src: this.data.head_pic_url,
              success: res => {
                this.setData({
                  head_pic_path: res.path
                })
                this.switchImg()
              }
            })
          }
        })
      }
    })
  },
  switchImg: function() {
    // 创建 绘制对象
    canvstoimg = wx.createCanvasContext('qrcode', this);
    console.log(this.data.bg_url, this.data.qrcode_path, this.data.head_pic_path);
    canvstoimg.drawImage(this.data.bg_url, 0, 0, 650 / this.data.bi, 920 / this.data.bi);
    canvstoimg.drawImage(this.data.qrcode_path, 28 / this.data.bi, 768 / this.data.bi, 140 / this.data.bi, 140 / this.data.bi)
    canvstoimg.save();
    canvstoimg.arc(340 / this.data.bi, 80 / this.data.bi, 50 / this.data.bi, 0, 2 * Math.PI)
    canvstoimg.clip();
    canvstoimg.drawImage(this.data.head_pic_path, 290 / this.data.bi, 30 / this.data.bi, 100 / this.data.bi, 100 / this.data.bi)
    canvstoimg.restore();
    canvstoimg.setFillStyle("#fff");
    canvstoimg.setFontSize(24 / this.data.bi);
    canvstoimg.fillText(this.data.username + '—邀您加入', (650 / this.data.bi - canvstoimg.measureText(this.data.username + '—邀您加入').width) / 2 + 10, 160 / this.data.bi)
    canvstoimg.fillText('邀请码：' + this.data.promo_code, 252 / this.data.bi, 310 / this.data.bi)
    canvstoimg.setFillStyle("#1E2328");
    canvstoimg.fillText('长按二维码识别', 220 / this.data.bi, 830 / this.data.bi)
    canvstoimg.fillText('UBI车服小程序', 220 / this.data.bi, 880 / this.data.bi)
    canvstoimg.draw();
  },
  saveImg: function() {
    // this.saveImageToPhotos();
    wx.showLoading();
    // 将 canvas 转换成图片 
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 680 / this.data.bi,
      height: 1020 / this.data.bi,
      destWidth: 680 * 8,
      destHeight: 1020 * 8,
      canvasId: 'qrcode',
      success: (res) => {
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.hideLoading()
            wx.showModal({
              content: '保存成功,随时发朋友圈~',
              showCancel: false,
              confirmText: '好的',
            })
          },
        })
      }
    })
  },
  showLayer: function() {},
  onUnload: function() {
    clearInterval(timer)
  },
  codeHide: function() {
    this.setData({
      codeHide: !this.data.codeHide
    })
  },

  // onShareAppMessage: function(res) { 
  //     var unionId = app.gd.unionId;
  //     if (app.gd.status == 0) {
  //         unionId = '';
  //         wx.showModal({
  //             title: '提示',
  //             content: '您还没有购买设备，本次转发不获得活动奖励',
  //             showCancel: true,
  //             cancelText: '取消',
  //             cancelColor: '#888',
  //             confirmText: '参与UBI',
  //             confirmColor: '#09bb01',
  //             success: (res)=> {
  //                 if (res.confirm) {
  //                     wx.navigateTo({
  //                         url: '../DetailVip/DetailVip',
  //                     })
  //                 }
  //             },
  //         })
  //     }

  //     return {
  //         title: '惠生活,邦保养!',
  //         desc: '惠生活,邦保养!',
  //         path: '/pages/index/index?unionId=' + unionId + '&shareUid=' + app.gd.uid,
  //         success: ()=> {
  //             // wx.showToast({
  //             //   title: unionId,
  //             //   icon:false,
  //             //   duration:2000
  //             // })
  //             console.log('我的unionId', unionId)
  //         }
  //     } 
  // },
  // 点击保存图片到相册(授权) 
  saveImageToPhotos: function(e) {
    let type1 = e.currentTarget.dataset.type;
    // 相册授权
    wx.getSetting({
      success: (res) => {
        // 进行授权检测，未授权则进行弹层授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              if (type1 == 1) {
                wx.saveImageToPhotosAlbum({
                  filePath: this.data.qrcode_path,
                })
              } else {
                this.saveImg();
              }
            },
            // 拒绝授权时，则进入手机设置页面，可进行授权设置
            fail() {
              wx.openSetting({
                success: (data) => {
                  console.log("openSetting success");
                },
                fail: (data) => {
                  console.log("openSetting fail");
                }
              });
            }
          })
        } else {
          // 已授权则直接进行保存图片
          if (type1 == 1) {
            wx.saveImageToPhotosAlbum({
              filePath: this.data.qrcode_path,
            })
          } else {
            this.saveImg();
          }
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  }
})
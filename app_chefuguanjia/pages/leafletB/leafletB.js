// pages/leaflet/leaflet.js 
let canvstoimg = null,
  close = null;
let timer;
const app = getApp(),
  urlHeader = app.gd.globalUrl;

Page({ 
  data: {
    imgUrl: app.gd.imgUrl,
    tableData: [],
    activityInfo: [],
    loopData: [],
    codeHide: true,
    qrcode_url: '', // 后台二维码地址
    qrcode_path: '', // 二维码本地路径 
    head_pic_path: '',
    username: '',
    bg_url: app.gd.imgUrl + '/leafletB.png', // 背景图路径 
    bi: '',
    sex: ''
  },
 
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        let {
          screenWidth
        } = res;
        that.setData({
          bi: 750 / screenWidth
        })
        console.log("比例", that.data.bi)
      },
      fail: err => console.log(err)
    })
    that.rwardList();
    that.getActivityInfo();
  },
  rwardList: function() {
    let that = this;
    wx.request({
      url: urlHeader + 'cbs/Popularize/shareIncome',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          tableData: res.data.data
        })
        // if (res.data.data.length > 7) {
        that.loop();
        // }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getActivityInfo: function() {
    let that = this;
    wx.request({
      url: urlHeader + 'cbs/Popularize/getContent',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          activityInfo: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  loop: function() {
    let that = this;
    this.setData({
      loopData: that.data.tableData.slice(0, 7)
    })
    if (that.data.tableData.length > 7) {
      timer = setInterval(function() {
        let arr = that.data.tableData,
          arr1 = [];
        arr.push(that.data.tableData.shift());
        arr1 = arr.slice(0, 7);
        that.setData({
          tableData: arr,
          loopData: arr1
        })
      }, 2000)
    }
  },
  buildImg: function() {
    let that = this;
    wx.request({
      url: urlHeader + 'ubi/Popularize/Lcode',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#888',
            confirmText: '确定',
            confirmColor: '#09bb07',
            success: (res) => {
              if (res.confirm) {
                wx.navigateToMiniProgram({
                  appId: 'wx5e18e3308b2c6e9f', // 要跳转的小程序的appid
                  path: 'pages/index/index', // 跳转的目标页面
                })
              }
            },
          })
        } else if (res.data.code == 1) {
          that.setData({
            codeHide: false,
            qrcode_url: res.data.data.img,
            sex: res.data.data.sex,
            head_pic_path: app.gd.userInfo.avatarUrl,
            username: app.gd.userInfo.nickName,
          })
          that.switchPath()
        } else {
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
  },
  switchPath: function() {
    // 获取qrcode图片本地路径
    let that = this;
    //  图片太大  加loading
    wx.showLoading()
    wx.getImageInfo({
      src: that.data.bg_url,
      success: res => {
        that.setData({
          bg_url: res.path
        })
        wx.getImageInfo({
          src: that.data.head_pic_path,
          success: res => {
            that.setData({
              head_pic_path: res.path
            })
            wx.getImageInfo({
              src: that.data.qrcode_url,
              success: res => {
                wx.hideLoading()
                that.setData({
                  qrcode_path: res.path
                })
                wx.hideLoading()
                that.switchImg()
              }
            })
          }
        })
      }
    })
  },
  switchImg: function() {
    let that = this;
    // 创建 绘制对象
    canvstoimg = wx.createCanvasContext('qrcode', that);
    console.log(that.data.bg_url, that.data.qrcode_path, that.data.head_pic_path);
    canvstoimg.drawImage(that.data.bg_url, 0, 0, 650 / that.data.bi, 920 / that.data.bi);
    canvstoimg.drawImage(that.data.qrcode_path, 28 / that.data.bi, 768 / that.data.bi, 140 / that.data.bi, 140 / that.data.bi)
    canvstoimg.save();
    canvstoimg.arc(340 / that.data.bi, 80 / that.data.bi, 50 / that.data.bi, 0, 2 * Math.PI)
    canvstoimg.clip();
    canvstoimg.drawImage(that.data.head_pic_path, 290 / that.data.bi, 30 / that.data.bi, 100 / that.data.bi, 100 / that.data.bi)
    canvstoimg.restore();
    canvstoimg.setFillStyle("#fff");
    canvstoimg.setFontSize(24 / that.data.bi);
    //#5B514C
    console.log(canvstoimg)
    canvstoimg.fillText(that.data.username + '—邀您加入', (650 / that.data.bi - canvstoimg.measureText(that.data.username + '—邀您加入').width) / 2 + 10, 170 / that.data.bi)
    canvstoimg.setFillStyle("#FFEA97");
    canvstoimg.fillText('邀请码：' + that.data.sex, 240 / that.data.bi, 490 / that.data.bi);
    canvstoimg.setFillStyle("#1E2328");
    canvstoimg.fillText('长按二维码参与', 220 / that.data.bi, 850 / that.data.bi);
    canvstoimg.draw();
  },
  saveImg: function(id) {

    let that = this;
    // that.saveImageToPhotos();
    wx.showLoading()
    let x = 0;
    let y = 0;
    let wid = 680 / that.data.bi;
    let hei = 1020 / that.data.bi;
    let dw = 680 * 8;
    let dh = 1020 * 8;
    if (id == 1) {
      x = 28 / that.data.bi;
      y = 768 / that.data.bi;
      wid = 140 / that.data.bi;
      hei = 140 / that.data.bi;
      dw = 140 * 8;
      dh = 140 * 8;
    }
    // 将 canvas 转换成图片
    wx.canvasToTempFilePath({
      x: x,
      y: y,
      width: wid,
      height: hei,
      destWidth: dw,
      destHeight: dh,
      canvasId: 'qrcode',
      success(res) {
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res) {
            wx.hideLoading()
            wx.showModal({
              content: '保存成功,随时发朋友圈~',
              showCancel: false,
              confirmText: '好的',
            })
          },
        })
      }
    }, that)
  },
  showLayer() {},
  onReady: function() {},
  onUnload: function() {
    clearInterval(timer)
  },
  codeHide: function() {
    let that = this;
    this.setData({
      codeHide: !that.data.codeHide
    })
  },

  // onShareAppMessage: function(res) {
  //   var that = this;
  //   var unionId = app.gd.unionId;
  //   if (app.gd.status == 0) {
  //     unionId = '';
  //     wx.showModal({
  //       title: '提示',
  //       content: '您还没有购买设备，本次转发不获得活动奖励',
  //       showCancel: true,
  //       cancelText: '取消',
  //       cancelColor: '#888',
  //       confirmText: '参与UBI',
  //       confirmColor: '#09bb01',
  //       success: function(res) {
  //         if (res.confirm) {
  //           wx.navigateTo({
  //             url: '../DetailVip/DetailVip',
  //           })
  //         }
  //       },
  //     })
  //   }

  //   return {
  //     title: '惠生活,邦保养!',
  //     desc: '惠生活,邦保养!',
  //     path: '/pages/index/index?unionId=' + unionId + '&shareUid=' + app.gd.uid,
  //     success: function() {
  //       // wx.showToast({
  //       //   title: unionId,
  //       //   icon:false,
  //       //   duration:2000
  //       // })
  //       console.log('我的unionId', unionId)
  //     }
  //   }

  // },
  // 点击保存图片到相册(授权)
  saveImageToPhotos: function(e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    // 相册授权
    wx.getSetting({
      success:(res) => {
        // 进行授权检测，未授权则进行弹层授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              if(id == 1){
                wx.saveImageToPhotosAlbum({
                  filePath: this.data.qrcode_path,
                })
              } else {
                that.saveImg(id);
              }
            },
            // 拒绝授权时，则进入手机设置页面，可进行授权设置
            fail() {
              wx.openSetting({
                success: function(data) {
                  console.log("openSetting success");
                },
                fail: function(data) {
                  console.log("openSetting fail");
                }
              });
            }
          })
        } else {
          // 已授权则直接进行保存图片
          if (id == 1) {
            wx.saveImageToPhotosAlbum({
              filePath: this.data.qrcode_path,
            })
          } else {
            that.saveImg(id);
          }
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  }
})
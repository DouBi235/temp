//index.js
//获取应用实例
const app = getApp();
let isFirstIntoPage = true;
let ifalert = true;
let tcIdx;
let intervalRequest;
// 是否在显示页面的时候，重新调用这个接口
let reifcanselect = 0;
Page({
  data: {
    status: 0,
    recommen: '',
    imgUrl: app.gd.imgUrl,
    motto: 'Hello World',
    userInfo: '',
    hasUserInfo: false,
    dong: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    product_introduce: false, //邦保养会员产品介绍弹框状态
    // deviceStatus: Math.floor((Math.random() * 3)), //0 未绑定，1 运行中，2 异常，3休眠
    deviceStatus: 0, //0 未绑定，1 运行中，2 异常，3休眠
    deviceCode: '',
    layerHide: false,
    navigateUrl: ['../saveFuel/saveFuel',
      '../diagnostics/diagnostics',
      '../protectiveCar/protectiveCar',
      '../faultWarning/faultWarning',
      '../offgasWarning/offgasWarning',
      '../appointTravel/appointTravel'
    ],
    promptData: '',
    mask: false,
    // 诊断师中异常信息
    isZds: 0,
    // 违章预警,    
  },
  //跳转到购买UBI页面
  skipDetailVip: function() {
    wx.navigateTo({
      url: '../DetailVip/DetailVip',
    })
  },
  onLoad: function() {},
  onUnload: function() {
    clearInterval(intervalRequest);
  },
  onReady: function() {
    let next = true,
      skipBind
    var animation = wx.createAnimation({
      duration: 2000
    })
    setInterval(() => {
      if (next) {
        animation.opacity(0.01).step();
        next = !next;
      } else {
        animation.opacity(1).step();
        next = !next;
      }
      this.setData({
        dong: animation.export()
      })
    }, 1000)
  },
  skipDetailVip: function() {
    this.setData({
      mask: false
    })
    wx.navigateTo({
      url: '../DetailVip/DetailVip',
    })
  },
  onShow() {
    this.setData({
      status: app.gd.status,
    })
    this._getPrompt();
    this.isBinding();
    this._policyStatus();
    this._policyStatus();
  },
  isBinding: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/isBinding',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        // code	0 未绑定 1绑定  status 0 异常 1 运行中 2 设备休眠
        if (res.data.code == 1) {
          this.setData({
            deviceCode: res.data.data.OBDID
          })
          if (res.data.data.status == 0) {
            // 通讯异常
            this.setData({
              deviceStatus: 2,
            })
          } else if (res.data.data.status == 1) {
            // 车辆启动
            this.setData({
              deviceStatus: 1, 
            })
          } else if (res.data.data.status == 2) {
            // 车辆停驶
            this.setData({
              deviceStatus: 3, 
            })
          }
        } else if (res.data.code == 0) {
          // 设备未绑定
          this.setData({
            deviceStatus: 0,
            deviceCode: ''
          })
        }
      },
    })
  },
  _getPrompt: function() {

    wx.request({
      url: app.gd.globalUrl + 'ubi/getPrompt',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log("登录后首页提醒", res);
        if (res.data.code == 1) {
          let rd = res.data.data;
          this.setData({
            promptData: rd
          })
          let tc = [];
          if (rd.isMaintenance != 0) {
            tc.push(rd.isMaintenance)
          }
          if (rd.isRaise != 0) {
            tc.push(rd.isRaise)
          }
          if (rd.isFault != 0) {
            tc.push(rd.isFault)
          }
          // if (rd.isDiagn != 0) {
          //   tc.push(rd.isDiagn)
          // }
          // if (rd.isTail != 0) {
          //   tc.push(rd.isTail)
          // } 
          if (rd.isPast != 0) {
            tc.push(rd.isPast)
          }
          // 每天只调用一次
          let sd = wx.getStorageSync("isZdsStatus");
          let td = new Date().toLocaleDateString();
          if (sd != td && rd.isZds != 0) {
            // 显示
            this.setData({
              isZds: rd.isZds
            })
            wx.setStorageSync("isZdsStatus", td)
          }
          console.log("保证每次进小程序只弹一次 ifalert", ifalert)
          if (ifalert && tc.length !== 0) {
            // 只弹一次
            tcIdx = 0;
            this.showModalTc(tc);
            ifalert = false;
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  isZdsBtn: function() {
    this.setData({
      isZds: 0
    })
  },
  showModalTc: function(info) {
    console.log("执行弹窗", info)
    wx.showModal({
      title: '提示',
      content: info[tcIdx],
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#09bb07',
      success: (res) => {
        if (tcIdx < info.length - 1) {
          tcIdx++;
          this.showModalTc(info);
        }
      },
    })
  },
  jumpToInnerPage: function(e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: this.data.navigateUrl[page],
    })
  },
  skippeng: function() {
    wx.navigateTo({
      url: '../collisionWarn/collisionWarn',
    })
  },
  skipjiuyuan: function() {
    wx.navigateTo({
      url: '../mianfeijiuyuan/mianfeijiuyuan',
    })
  },
  skipcx: function() {
    let res = wx.getStorageSync("ifCan")
    if (res.data.code == 0) {
      // 当用户需要跳转到填写信息页返回时onshow需要重调接口
      reifcanselect = 1;
      //用户未完善信息
      wx.showModal({
        title: '提示',
        content: res.data.msg,
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#09bb07',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../Mypersonal/Mypersonal',
            })
          }
        },
      })
    } else if (res.data.code == 1) {
      // 可以查询 无查询历史 跳转到查询页
      let data = JSON.stringify(res.data);
      wx.navigateTo({
        url: '../searchw/searchw?data=' + data,
      })
    } else if (res.data.code == 2) {
      // 有查询历史，且有违章记录后端将各项数据返回
      let data = JSON.stringify(res.data);
      wx.navigateTo({
        url: '../breachRecord/breachRecord?data=' + data,
      })
    } else if (res.data.code == 3) {
      // 有查询历史，但当前wu违章记录
      let data = JSON.stringify(res.data);
      wx.navigateTo({
        url: '../breachRecord/breachRecord?data=' + data,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1500,
      })
    }
  },
  skipBind: function() { //跳到绑定设备页面
    wx.navigateTo({
      url: '../bindDevice/bindDevice',
    })
  },
  skipMileage: function() { //跳转到行驶里程
    wx.navigateTo({
      url: '../mileage/mileage',
    })
  },
  hideLayer: function() {
    this.setData({
      hasUserInfo: false
    })
  },
  //关闭弹窗
  close: function() {
    this.setData({
      mask: false
    })
  },
  //获取保单状态
  _policyStatus() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Refund/policyAudit',
      data: {
        uid: app.gd.uid
      },
      method: "GET",
      success: res => {
        if (res.data.code == 1 && res.data.data.status == 1) {
          var pid = res.data.data.pid;
          wx.showModal({
            title: '提醒',
            content: res.data.msg,
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.request({
                  url: app.gd.globalUrl + 'ubi/Refund/policyAdopt',
                  method: "GET",
                  data: {
                    pid: pid
                  },
                  success: function(res) {
                    wx.switchTab({
                      url: '../return/return',
                    })
                  }
                })
              }
            }
          })
        } else if (res.data.code == 1 && res.data.data.status == 3) {
          var pid = res.data.data.pid;
          wx.showModal({
            title: '提醒',
            content: '您的上传保单申请被驳回',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.request({
                  url: app.gd.globalUrl + 'ubi/Refund/policyAdopt',
                  method: "GET",
                  data: {
                    pid: pid
                  },
                  success: function(res) {
                    wx.switchTab({
                      url: '../return/return',
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  // showLayer: function () {
  //   this.setData({
  //     layerHide: false
  //   })
  // },
  layerBoxFn: function() {

  },
  hideinfoshow: function() {
    this.setData({
      ['recommen.ifPopup']: 0
    })
  },
})
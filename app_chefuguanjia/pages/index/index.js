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
    lvsechuxing: false,
    lvsedate: '',
    // 分红介绍弹窗
    fenhongShow: false,
    hintData: 0,
    twoNum: '',
    is_protect: ''
  },
  gettwoNum: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/sumAll',
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            twoNum: res.data.data
          })
        }
      },
    })
  },
  //跳转到购买UBI页面
  skipDetailVip: function() {
    wx.navigateTo({
      url: '../DetailVip/DetailVip',
    })
  },
  catchnull: function() {},
  onLoad: function(options) {
    app.getInfoCallback = res => {
      console.log('查看得到的数据:', res)
    }
    //判断是不是分享页进来的，有没有unionID和分享者id
    if (options.shareUid && options.unionId) {
      wx.request({
        url: app.gd.globalUrl + 'ubi/Popularize/judgeUser',
        data: {
          uid: options.shareUid
        },
        method: 'POST',
        success: function(res) {
          if (res.data.code == 0) {
            app.gd.recommen_unionId = ""
            console.log('没有啊', app.gd.recommen_unionId)
          } else if (res.data.code == 1) {
            app.gd.recommen_unionId = options.unionId
            console.log('有啊', app.gd.recommen_unionId)
          }
        },

      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              wx.showLoading({
                title: '登录中...',
                mask: true,
              })
              console.log("获取授权成功", res)
              if (app.gd.uid === '') {
                app.gd.userInfo = res.userInfo;
                this.mylogin(res, 0)
              } else {
                console.log("isFirstIntoPage", isFirstIntoPage)
                if (isFirstIntoPage) {
                  // 调用首页数据
                  this.getPrompt();
                  this.isBinding();
                }
              }
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: false
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: true
          })
        }
      }
    });
    intervalRequest = setInterval(() => {
      this.isBinding();
    }, 1000 * 60 * 5);
    this.gettwoNum();
    // 每天只调用一次  
  },
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
    console.log("isFirstIntoPage", isFirstIntoPage)
    if (!isFirstIntoPage) {
      // 调用首页数据
      this.getPrompt();
      this.isBinding();
      this._policyStatus();
      this._getMessage();
    }
    isFirstIntoPage = false;
    if (reifcanselect) {
      wx.showLoading()
      this._ifCanSelect();
      reifcanselect = 0;
    }
  },
  getUserInfo: function(e) {
    console.log("获取授权成功", e)
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '登录中...',
        mask: true,
      })
      var userInfo = e.detail.userInfo;
      app.gd.userInfo = userInfo;
      this.setData({
        userInfo: userInfo
      })
      this.mylogin(e.detail, 1);
    } else {
      wx.showModal({
        title: '提示',
        content: '拒绝授权，部分功能将受限或不正常',
        showCancel: false,
        confirmText: '好的',
        confirmColor: '#09bb07',
      })
    }
  },
  mylogin: function(e, first) {
    console.log('有没有' + first)
    wx.login({
      success: res => {
        console.log(app)
        console.log("去调用后台登录接口")
        wx.request({
          url: app.gd.globalUrl + 'ubi/login',
          data: {
            code: res.code,
            encryptedData: e.encryptedData,
            iv: e.iv,
            recommen_unionId: app.gd.recommen_unionId,
            avatarUrl: e.userInfo.avatarUrl,
            nickName: e.userInfo.nickName,
            gender: e.userInfo.gender,
          },
          success: res => {
            console.log("dengluchenggong", res)
            if (res.data.code == 1) {
              wx.hideLoading()
              // wx.showToast({
              //   title: '登录成功'
              // })
              this.setData({
                hasUserInfo: false,
                uid: res.data.data.uid
              })
              console.log(this.data.userInfo)
              wx.setStorage({
                key: 'userInfo',
                data: this.data.userInfo,
              })
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid,
              })
              wx.setStorage({
                key: 'uid',
                data: res.data.data.uid,
              })
              app.gd.uid = res.data.data.uid;
              app.gd.unionId = res.data.data.unionId;
              app.gd.recommen = res.data.data.recommen;
              app.gd.openid = res.data.data.openid;
              app.gd.status = res.data.data.status;
              this.setData({
                status: res.data.data.status,
              })
              this.setData({
                recommen: res.data.data.recommen
              })
              //当用户第一次,登录的时候,显示邦保养会员弹框
              if (first) {
                this.setData({
                  product_introduce: true,
                  // product_introduce: false
                })
              }
              if (res.data.data.status == 0 && !wx.getStorageSync("mask")) {
                console.log("设置显示红色宣传框")
                this.setData({
                  mask: true
                })
                wx.setStorageSync("mask", 1)
              }
              // 调用首页数据
              this.isBinding();
              this.getPrompt();
              this.hint();
              this._getMessage();
              // 获取定位 判断是否可以正常进入小程序
              this.getposition();
              this._policyStatus();

              // 每天只调用一次
              let sd = wx.getStorageSync("ifCanSelect");
              let td = new Date().toLocaleDateString();
              if (sd != td) {
                // 显示 
                this._ifCanSelect();
              } else {
                let sdata = wx.getStorageSync('ifCan')
                this.setData({
                  ifCanSelect: sdata
                })
              }
              // 分红介绍的弹窗显示 
              let hsd = wx.getStorageSync("fenhongintro");
              // 每月 显示一次
              if (td.substr(-2, 2) == 28 && td != hsd) {
                // 显示 
                this.setData({
                  fenhongShow: true
                })
                wx.setStorageSync("fenhongintro", td)
              }
              if (res.data.data.isRank !== 0) {
                wx.showModal({
                  title: '提示',
                  content: '您购买设备未填写地址，现在去填写',
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#888',
                  confirmText: '好的',
                  confirmColor: '#09bb07',
                  success: function(res1) {
                    if (res1.confirm) {
                      wx.navigateTo({
                        url: '../okBuyVip/okBuyVip?mid=' + res.data.data.isRank,
                      })
                    }
                  },
                })
              }
            }
          },
          complete: function(res) {
            console.log("dengluwancheng", res)
          }
        })
      }
    })
  },
  hint: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/hint',
      data: {
        uid: app.gd.uid,
      },
      method: 'POST',
      success: (res) => {
        console.log(res, "hint")
        if (res.data.code == 1) {
          this.setData({
            hintData: res.data.data
          })
        } else {
          this.setData({
            hintData: ''
          })
          this.setData({
            hintData: ''
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  wozhidaole: function(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      hintData: 0
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/updateStatus',
      data: {
        uid: app.gd.uid,
        id: id
      },
      method: 'POST',
      success: function(res) {
        console.log(res, "updateStatus")
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getWeizhangshu: function() {

  },
  //小程序跳转到邦保养
  skipBBy: function() {
    wx.navigateToMiniProgram({
      appId: 'wx5e18e3308b2c6e9f', // 要跳转的小程序的appid
      path: 'pages/index/index', // 跳转的目标页面
    })
  },
  //跳转小程序到顺风出行
  skipSf: function() {
    wx.navigateToMiniProgram({
      appId: 'wxb42b701ddbd6cbd9', // 要跳转的小程序的appid
      path: 'pages/index/index', // 跳转的目标页面
    })
  },
  // 获取定位
  getposition: function() {

    wx.getLocation({
      type: 'wgs84',
      complete: (Lres) => {
        console.log("定位位置 getLocation", Lres)
        // 获取授权设置
        if (Lres.errMsg === "getLocation:ok") {
          this.setData({
            lat: Lres.latitude,
            lng: Lres.longitude
          })
          app.gd.lat = Lres.latitude;
          app.gd.lng = Lres.longitude;
          wx.request({
            url: app.gd.globalUrl + 'ubi/upD',
            data: {
              uid: app.gd.uid,
              lat: Lres.latitude,
              lng: Lres.longitude
            },
            method: 'GET',
          });
          this.isDenied(Lres);
          console.log(Lres);
        } else {
          wx.getSetting({
            success: res => {
              console.log("定位位置 getSetting", res)
              // 判断位置授权设置
              wx.request({
                url: app.gd.globalUrl + 'ubi/upD',
                data: {
                  uid: res.data.data.uid,
                  lat: res.latitude,
                  lng: res.longitude
                },
                header: {},
                method: 'GET',
                success: function(res) {},
              });
              this.judgePosition(res)
            }
          })
        }
      }
    })
  },
  // 判断位置授权设置
  judgePosition: function(res) {

    // 如果同意位置授权
    if (res.authSetting['scope.userLocation']) {
      // 获取位置
      wx.getLocation({
        type: 'wgs84',
        success: (response) => {
          // 是否可以正常进入小程序
          this.isDenied(response);
        },
      })
    } else { //不同意位置授权时
      wx.showModal({
        title: '提示',
        content: '您未授权获取位置信息，部分功能将受限',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#09bb07',
        success: () => {
          // 打开授权设置页面
          wx.openSetting({
            success: (Sres) => {
              console.log("设置 res", Sres);
              // 判断授权设置
              this.judgePosition(Sres);
            },
          })
        },
      })
    }
  },
  // 是否可以正常进入小程序
  isDenied: function(response) {

    wx.request({
      url: app.gd.globalUrl + 'ubi/VerReg',
      data: {
        latitude: response.latitude,
        longitude: response.longitude,
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        console.log("isDenied", res)
      },
    })
  },
  // 跳转到车管家
  toi139: function() {
    wx.navigateTo({
      url: '../index1/index1',
    })
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
          if (res.data.data.status == 0) {
            this.setData({
              deviceStatus: 2,
              deviceCode: res.data.data.OBDID
            })
          } else if (res.data.data.status == 1) {
            this.setData({
              deviceStatus: 1,
              deviceCode: res.data.data.OBDID
            })
          } else if (res.data.data.status == 2) {
            this.setData({
              deviceStatus: 3,
              deviceCode: res.data.data.OBDID
            })
          }
          // 判断首页绿色出行弹窗是否显示
          if (res.data.data.refund != 0) {
            let sd = wx.getStorageSync("lvsechuxing");
            let td = new Date().toLocaleDateString();
            // 如果要显示，先判断今天显示过了没
            if (sd != td) {
              // 没显示过，就让他显示
              this.setData({
                lvsechuxing: true,
                lvsedate: res.data.data.refund
              })
              wx.setStorageSync("lvsechuxing", td)
              // 隐藏事件  hidelvse
            }
          }
        } else if (res.data.code == 0) {
          this.setData({
            deviceStatus: 0,
            deviceCode: ''
          })
        }
      },
    })
  },
  hidelvse: function(e) {
    this.setData({
      lvsechuxing: false
    })
    // 区分是点击关闭还是点击查看
    if (e.currentTarget.dataset.c == 1) {
      wx.switchTab({
        url: '../return/return',
      })
    }
  },
  getPrompt: function() {

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
  //点击邦保养会员我知道了,关闭当前弹框
  CloseIntroduce() {
    this.setData({
      product_introduce: false
    })
  },
  // jumpToOther: function (){
  //   wx.navigateToMiniProgram({
  //     appId: "wxb42b701ddbd6cbd9",
  //     path: 'pages/index/index?id="wxb42b701ddbd6cbd9"',
  //     envVersion: 'release',
  //     success(res) {
  //       // 打开成功
  //     }
  //   })offgasWarning
  // },
  jumpToOther: function() { //跳转到尾气预警
    // wx.navigateTo({
    //   url: '../offgasWarning/offgasWarning',
    // })
    wx.navigateTo({
      url: '../tailWarn/tailWarn',
    })
  },
  //跳转到保险拼团
  // skippt: function() {
  //   wx.navigateTo({
  //     url: '../groupBuy/groupBuy',
  //   })
  // },
  skippeng: function() {
    // wx.navigateTo({
    //   url: '../pengzhuang/pengzhuang',
    // })
    wx.navigateTo({
      url: '../collisionWarn/collisionWarn',
    })
  },
  skipbaobiao: function() {
    wx.navigateTo({
      url: '../mapPage/mapPage?is_protect=' + this.data.is_protect,
    })
  },
  skipjiuyuan: function() {
    wx.navigateTo({
      url: '../mianfeijiuyuan/mianfeijiuyuan',
    })
  },
  _ifCanSelect: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/plateSel/ifCanSelect',
      data: {
        uid: app.gd.uid,
        type: 1
      },
      method: 'POST',
      success: (res) => {
        let td = new Date().toLocaleDateString();
        if (res.data.code != 0) {
          wx.setStorageSync("ifCanSelect", td)
        }
        this.setData({
          ifCanSelect: res
        })
        wx.setStorageSync('ifCan', res)
      },
      complete: function() {
        wx.hideLoading();
      }
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
  onShareAppMessage: function() {

  },
  hideinfoshow: function() {
    this.setData({
      ['recommen.ifPopup']: 0
    })
  },
  navserviceList: function() {
    wx.navigateTo({
      url: '../serviceList/serviceList',
    })
  },
  navservice: function() {
    wx.navigateTo({
      url: '../service/service',
    })
  },
  skipyou: function() {
    wx.navigateTo({
      url: '../youzhanList/youzhanList',
    })
  },
  _getMessage: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/info',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            is_protect: res.data.data.is_protect
          })
          if (res.data.data.unread != 0) {
            wx.showTabBarRedDot({
              index: 4,
            })
          } else {
            wx.hideTabBarRedDot({
              index: 4,
            })
          }
        }
      }
    })
  }
})
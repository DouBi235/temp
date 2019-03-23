var app = getApp(),
  urlHeader = app.gd.globalUrl;
var province = [];
var city = [];
var area = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    imgUrl: app.gd.imgUrl,
    recommen: '',
    province: [],
    city: [],
    area: [],
    cityId: 0,
    proName: "请选择省份",
    cityName: "请选择城市",
    areaName: "请选择地区",
    adDetail: "",
    name: "",

    isFocus: false,
    infoShow: false,
    recommenImg: '',
    recommenName: '',

    Inputlength: 6,
    promo_code: '',
    recommen_unionId: '',
    resrecommenunionId: '',
    status: '',
    hadcontent: '',
    fee: 868,
    mid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      recommen: app.gd.recommen,
      proName: app.gd.pro,
      cityName: app.gd.city,
      areaName: app.gd.area,
      name: app.gd.name,
      phone: app.gd.phone,
      adDetail: app.gd.inputName,
      cityId: app.gd.cityId,
      uid: app.gd.uid,
      recommen_unionId: app.gd.recommen_unionId,
      status: app.gd.status,
      mid: options.mid
    });
    if (app.gd.recommen.code == 1) {
      this.setData({
        recommenImg: app.gd.recommen.detail.head_pic,
        recommenName: app.gd.recommen.detail.nick_name,
      })
    }
    wx.request({
      url: urlHeader + 'cb/Member/pro',
      method: 'POST',
      success: (res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          province.push(res.data.data[i].name)
        }
        this.setData({
          province: province
        })
      }
    })
    this.getContent();
  },
  getContent: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/MemberB/ifAddress',
      data: {
        uid: app.gd.uid,
        unionId: app.gd.unionId
      },
      method: 'POST',
      success: (res) => {
        console.log("ifaddress", res);
        if (res.data.code == 1) {
          this.setData({
            hadcontent: res.data.msg,
            info: res.data.info
          })
        } else {
          this.setData({
            hadcontent: ''
          })
        }
      },
    })
  },
  getshebeigao: function() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: 750 / res.screenWidth * res.screenHeight
        })
      },
    })
  },
  //选择省份并获取已选取省的所有城市
  changePro: function(e) {
    var that = this;
    var index = e.detail.value;
    wx.showLoading();
    city = [];
    this.setData({
      proName: province[index]
    })
    app.gd.pro = province[index];
    wx.request({
      url: urlHeader + 'cb/Member/pro',
      method: 'POST',
      success: (res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          if (province[index] == res.data.data[i].name) {
            this.setData({
              proId: res.data.data[i].id
            })
            wx.request({
              url: urlHeader + 'cb/Member/city',
              method: "POST",
              data: {
                pro: res.data.data[i].id
              },
              success: function(res2) {
                for (var j = 0; j < res2.data.data.length; j++) {
                  city.push(res2.data.data[j].name)
                }
                that.setData({
                  city: city,
                })
                wx.hideLoading();
              }
            })
          }
        }
      }
    })
  },
  //选择城市获取已选取城市的所有地区
  changeCity: function(e) {
    var that = this;
    var index = e.detail.value;
    wx.showLoading();
    that.setData({
      cityName: city[index],
      areaName: '请选择地区'
    })
    app.gd.city = city[index];
    wx.request({
      url: urlHeader + 'cb/Member/city',
      method: 'POST',
      data: {
        pro: that.data.proId
      },
      success: function(res) {
        area = [];
        for (var i = 0; i < res.data.data.length; i++) {
          if (city[index] == res.data.data[i].name) {
            that.setData({
              cityId: res.data.data[i].id
            })
            app.gd.cityId = res.data.data[i].id;
            wx.request({
              url: urlHeader + 'cb/Member/county',
              method: "POST",
              data: {
                city: that.data.cityId
              },
              success: function(res2) {
                for (var j = 0; j < res2.data.data.length; j++) {
                  area.push(res2.data.data[j])
                }
                that.setData({
                  area: area
                })
                wx.hideLoading();
              }
            })
          }
        }
      }
    })
  },
  //选择地区
  changeArea: function(e) {
    var that = this;
    var index = e.detail.value;

    that.setData({
      areaName: area[index]
    })
    app.gd.area = area[index]
  },
  //输入详细地址
  inputName: function(e) {
    this.setData({
      adDetail: e.detail.value
    })
    app.gd.inputName = e.detail.value
  },
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
    app.gd.name = e.detail.value
  },
  phone: function(e) {
    var that = this;
    var phoneNum = e.detail.value;
    var patt = /^\d*$/;
    if (patt.test(phoneNum)) {
      app.gd.phone = phoneNum;
      wx.setStorage({
        key: 'phoneNum',
        data: phoneNum
      })
      that.setData({
        phone: phoneNum
      })
      return phoneNum;
    } else {
      return '';
    }
  },
  pay: function() { //发送收获地址，和吊起支付接口
    var d = this.data;
    if (app.gd.status != 2 && (!d.cityId || !d.adDetail || !d.name || !d.phone)) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1500,
      })
      return;
    } else if (app.gd.status == 2) {
      wx.showModal({
        title: '',
        content: '是否开具发票',
        cancelText: '取消',
        cancelColor: '#888',
        confirmText: '确定',
        confirmColor: '#09bb07',
        success: (cres) => {
          if (cres.confirm) {
            wx.switchTab({
              url: '../index/index',
            })
            wx.navigateTo({
              url: '../fapiao/fapiao?fee=' + d.fee + '&mid=' + d.mid,
            })
          } else {
            wx.switchTab({
              url: '../index/index',
            })
          }
        },
      })
      return;
    }
    wx.request({
      url: urlHeader + 'ubi/Member/putDarw',
      method: "POST",
      data: {
        uid: d.uid,
        man: d.name,
        phone: d.phone,
        address: d.proName + d.cityName + d.areaName.name,
        details: d.adDetail,
        area: d.cityId,
        city: d.areaName.id,
      },
      success: (res) => {
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
          })
        } else if (res.data.code == 1) {
          wx.showModal({
            title: '',
            content: '是否开具发票',
            cancelText: '取消',
            cancelColor: '#888',
            confirmText: '确定',
            confirmColor: '#09bb07',
            success: (cres) => {
              if (cres.confirm) {
                wx.switchTab({
                  url: '../index/index',
                })
                wx.navigateTo({
                  url: '../fapiao/fapiao?fee=' + d.fee + '&mid=' + d.mid,
                })
              } else {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            },
          })
        }
      }
    })
  },
  onShow: function() {},
  Tap() {
    this.setData({
      isFocus: true,
    })
  },
})
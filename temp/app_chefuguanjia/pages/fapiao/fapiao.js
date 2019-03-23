var app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({
  data: {
    imgUrl: app.gd.imgUrl,
    shuih: '', //税号
    gongsim: '', //公司名称
    lianxir: '', //联系人
    lianxidianh: '', //联系电话
    dizhi: '请输入送票地址', //送票地址
    dizhidet: '', //详细地址
    fee: '',
    mid: ''
  },
  onLoad: function(options) {
    this.setData({
      fee: (options.fee * 0.1 + '').substring(0, 4),
      mid: options.mid
    })
  },
  //确认支付
  thatConfirm: function() {
    var d = this.data;
    console.log(!d.shuih || !d.gongsim || !d.lianxir || !d.lianxidianh || !d.dizhidet || d.dizhi == '请输入送票地址')
    if (!d.shuih || !d.gongsim || !d.lianxir || !d.lianxidianh || !d.dizhidet || d.dizhi == '请输入送票地址') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1500,
      })
      return;
    }
    wx.showLoading({
      title: '正在提交...',
    })
    wx.request({
      url: urlHeader + 'ubi/MemberB/memberpay',
      method: "POST",
      data: {
        mid: d.mid, //会员id
        unionId: app.gd.unionId,
        open_id: app.gd.openid,
        num: d.shuih, //税号
        company: d.gongsim, //公司名称
        contact: d.lianxir, //联系人 
        telphone: d.lianxidianh, //联系电话
        fee: d.fee, // 发票金额
        type: app.gd.status, // 1代表UBI车服获取的设备 ，2代表邦保养获得的设备
        uid: app.gd.uid,
        address: d.dizhi + d.dizhidet, // 地址详情 
      },
      success: (res) => {
        if (res.data.code == 1) {
          wx.hideLoading();
          var time = (res.data.data.timeStamp).toString(),
            str = res.data.data.nonceStr,
            payage = res.data.data.package,
            Type = res.data.data.signType,
            md5 = res.data.data.paySign;
          wx.requestPayment({
            timeStamp: time,
            nonceStr: str,
            'package': payage,
            signType: Type,
            paySign: md5,
            success: (res1) => {
              var info = d.info;
              if (res1.errMsg == 'requestPayment:ok') {
                wx.showToast({
                  title: '支付成功',
                  duration: 1500
                })
                setTimeout(function() {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }, 1500)
              }
            },
            fail: (err) => {
              console.log(err);
              console.log('支付失败');
            }
          })
        } else if (res.data.code == 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        } else if (res.data.code == 2) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function() {}
          })
        }
      }
    })
  },
  //点击取消
  thatCancel: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  //获得税号
  getTax: function(e) {
    this.setData({
      shuih: e.detail.value
    });
  },
  //获得公司名称
  getCompany: function(e) {
    this.setData({
      gongsim: e.detail.value
    });
  },
  //获得联系人
  getUs: function(e) {
    this.setData({
      lianxir: e.detail.value
    });
  },
  //获得联系电话
  getPhone: function(e) {
    this.setData({
      lianxidianh: e.detail.value
    });
  },
  //获得送票地址
  getAdd: function(e) {
    this.setData({
      dizhi: e.detail.value
    });
  },
  //获取详细地址
  getAddInfo: function(e) {
    this.setData({
      dizhidet: e.detail.value
    });
  },
})
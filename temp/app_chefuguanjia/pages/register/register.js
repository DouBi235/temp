// pages/register/register.js
import {
  getUserInfo
} from '../../utils/getUserInfo.js'
import {
  _getShopDetail,
  _getPro,
  _getCity,
  _getCounty,
  _ifBuy,
  _memberpay
} from '../../utils/server.js'
const app = getApp();
const imgUrl = app.gd.imgUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    hasUserInfo: false,
    sid: '',
    uid: '',
    promo_code: null,
    name: '',
    phone: '',
    address: "",
    Receiving_goodsData: {
      name: '',
      phone: '',
      address: ''
    }, //默认收货人信息
    province: null, //省份
    ProID: null, //省id
    city: null, //市
    county: null, //区/县
    currentPro: '请选择省份', //默认显示的省份
    currentCity: '请选择市', //默认显示的市
    currentCounty: '请选择区/县',
    area: null,
    Inputlength: 6,
    isFocus: false, //聚焦  
    Value: "", //输入的内容  
    ispassword: true, //是否密文显示 true为密文， false为明文。
    placeholder: ['请', '输', '入', '注', '册', '码']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    console.log('onload')
    console.log('unionId', app.gd.unionId, 'uid', app.gd.uid)
    wx.getStorage({
      key: 'uid',
      success: res => {
        this.setData({
          uid: res.data
        })
      }
    })
    let recommen_unionId = app.gd.recommen_unionId
    /** 开发模式,模拟是扫码进入的小程序，query代表的是扫码进入小程序携带的参数 **/
    this.setData({
      sid: recommen_unionId.substr(0, recommen_unionId.indexOf(','))
    })

    /**wx.checkSession 校验当前用户的session_key是否有效 **/
    wx.checkSession({
      success: res => {
        console.log('session_key没有过期', res)
        this.loginState()
      },
      fail: err => {
        console.log('session_key过期了请重新登录', err)
        wx.removeStorage({
          key: 'unionId',
          success: res => {
            this.loginState()
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loginState() { /** 检测用户登录状态 **/
    wx.getStorage({
      key: 'unionId',
      success: res => {
        this.IfBuy(res.data)
      },
      fail: err => {
        this.setData({
          hasUserInfo: true
        })
      }
    })
  },
  onReady: function() {
    console.log('onReady')


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow')

    /**
     * 获取用户默认收货地址
     */
    _getShopDetail(this.data.sid).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        /**
         * 存储成功后的数据,进行页面渲染
         */
        let data = res.data.data;
        this.setData({
          name: data.name,
          phone: data.phone,
          address: data.address,
          Receiving_goodsData: data,
          currentPro: data.province ? data.province : '请选择省份',
          currentCity: data.city ? data.city : '请选择市',
          currentCounty: data.county ? data.county : '请选择区/县',
          area: data.county_id
        })
        /** 根据默认省id获取市 **/
        console.log(data.province_id)
        this.getCity(data.province_id)
        /**根据默认省id获取区/县 */
        this.getCounty(data.city_id)
      }
    })

    /**
     * 获取省
     */
    _getPro().then(res => {
      this.setData({
        province: res.data.data
      })
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

  },

  /**
   * 登陆
   */
  getUserInfo() {
    /** 登录/授权 **/
    getUserInfo().then(res => {
      let hasUserInfo;
      if (res.code == 1) {
        wx.hideLoading()
        hasUserInfo = false
        /** 登录成功后,关闭登录弹框 **/
        this.setData({
          hasUserInfo: false,
          uid: res.data.uid
        })
        /** 把用户登录成功之后的uid存入缓存,代表成功的标示 **/
        wx.setStorageSync('uid', res.data.uid)
        wx.setStorageSync('unionId', res.data.unionId)
        /** 登录成功，和失败的提示语 **/

        return new Promise((resolve, reject) => {
          wx.showToast({
            title: res.msg
          })
          setTimeout(() => {
            resolve(res.data.unionId)
          }, 1000);
        });

      }

    }).then(res => {
      this.IfBuy(res)
    })
  },
  /** 查看用户是否支付或者认证过 code = 0代表已经认证过 code = 1用户支付完成 code = 2 用户没有支付**/
  IfBuy(data) {
    _ifBuy(this.data.sid, data).then(res => {
      switch (res.data.code) {
        case 0:
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            complete: () => {
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
          break;
        case 1:
          wx.navigateTo({
            url: '../registerState/registerState',
            success: () => {
              setTimeout(() => {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
              }, 1000)
            }
          })
          break;
      }
    })
  },
  /** 获取收件人姓名 **/
  getAddressee(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  /** 获取手机号 **/
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /** 获取推荐人注册码 **/
  Focus(e) {

    let placeholder = '请,输,入,注,册,码'.split(',')
    let data = e.detail.value.length < 1 ? placeholder : [];

    this.setData({
      placeholder: data,
      promo_code: e.detail.value
    })
  },
  Tap() {
    this.setData({
      isFocus: true,
    })
  },
  /** 获取详细地址 **/
  get_address(e) {
    this.setData({
      address: e.detail.value
    })
  },
  /**
   * 获取省份index根据当前index拿取对应数据
   */
  changePro(e) {
    console.log(e)
    let index = e.detail.value;
    this.setData({
      currentPro: this.data.province[index].name,
    })
    this.getCity(this.data.province[index].id)
  },
  /**
   * 获取市index根据当前index拿取对应数据
   */
  changeCity(e) {
    let index = e.detail.value;
    this.setData({
      currentCity: this.data.city[index].name,
    })
    /** 市发生改变时,根据市的id获取县或区的数据 **/
    let id = this.data.city[index].id
    this.getCounty(id)
  },
  /**
   * 获取区/县index根据当前index拿取对应数据
   */
  changeCounty(e) {
    let index = e.detail.value;
    this.setData({
      currentCounty: this.data.county[index].name,
    })
    let id = this.data.county[index].id
    this.setData({
      area: id
    })
  },
  /**
   * 获取市数据
   */
  getCity(id) {
    _getCity(id).then(res => {
      console.log
      this.setData({
        city: res.data.data
      })
    })
  },
  /**
   * 获取区或县数据
   */
  getCounty(id) {
    _getCounty(id).then(res => {
      this.setData({
        county: res.data.data
      })
    })
  },
  /**
   * 支付
   */
  pay() {
    let data = this.data;
    console.log(this.data.name)
    _memberpay({
      uid: data.uid,
      sid: data.sid,
      address: `${data.currentPro}${data.currentCity}${data.currentCounty}`,
      man: data.name,
      phone: data.phone,
      details: data.address,
      promo_code: data.promo_code,
      area: data.area,
    }).then(res => {
      /** 调取微信支付二维码**/
      if (res.data.code == 1) {
        let data = res.data.data
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success: res => {
            console.log(res)
            if (res.errMsg == 'requestPayment:ok') {
              wx.showToast({
                title: '支付成功',
                success: () => {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '../registerState/registerState',
                    }, 2000)
                  })
                }
              })
            }
          },
          fail: err => {
            wx.showToast({
              icon: 'error',
              image: imgUrl + '/error.png',
              title: '支付失败',
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
        })
      }

    })
  }
})
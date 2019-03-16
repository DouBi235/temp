const app = getApp(),
imgUrl = app.gd.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图片
    photo: [],
    // 获取详情列表
    getList: [],
    // 店铺名称
    company: '',
    // 距离
    distance: '',
    // 具体位置
    address: '',
    // 店铺电话
    serphone: '',
    // 厂家描述
    about: '',
    // 技师人数
    entotal: '',
    // 技师列表
    engineer: [],
    // 综合评分
    comment: '',
    // 服务态度评分
    tn_star: '',
    // 维修评分
    shop_star: '',
    // 评价列表
    commentList: [],
    movies: [{
        url: imgUrl+'/car_1.jpg'
      },
      {
        url: imgUrl+'/car_1.jpg'
      },
      {
        url: imgUrl+'/car_1.jpg'
      }
    ],
    loc: imgUrl+'/loc.png',
    location: imgUrl+'/position232.png',
    icon1: imgUrl+'/btn_home_bby@2x.png',
    icon2: imgUrl+'/btn_home_bbyyy@2x.png',
    icon3: imgUrl+'/btn_home_yjcx@2x.png',
    icon4: imgUrl+'/btn_home_Shop@2x.png',
    icon5: imgUrl+'/btn_home_cfgj@2x.png',
    icon6: imgUrl+'/btn_home_wxg@2x.png',
    phone: imgUrl+'/fdsa.png',
    arrow: imgUrl+'/rArrow.png',
    star_1: imgUrl+'/star_1.png',
    star_2: imgUrl+'/star_2.png',
    star_3: imgUrl+'/star_3.png',
    star_4: imgUrl+'/star_4.png'
  },

  tel: function(options) {
    wx.makePhoneCall({
      phoneNumber: options.currentTarget.dataset.phone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取店铺id
    var sid = Number(options.sid);
    console.log('获取的店铺id为', sid);
    wx.request({
      url: app.gd.globalUrl + 'ubi/Serve/serveDetail',
      method: 'POST',
      data: {
        uid: app.gd.uid,
        sid: sid
      },
      success: function(e) {
        console.log('店铺详情信息', e);
        that.setData({
          photo: e.data.data.photo,
          company: e.data.data.company,
          distance: e.data.data.distance,
          address: e.data.data.address,
          serphone: e.data.data.serphone,
          about: e.data.data.about,
          entotal: e.data.data.count,
          engineer: e.data.data.engineer,
          comment: e.data.data.comment,
          tn_star: e.data.data.tn_star,
          shop_star: e.data.data.shop_star,
          commentList: e.data.data.commentList
        })
      }
    })
  },
})
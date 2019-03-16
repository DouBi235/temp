// pages/Mypersonal/Mypersonal.js
var app = getApp(),
  url = app.gd.globalUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    car: '请选择车型',
    pailiang: "请选择排量",
    uid: '', //用户id
    userInfo: '',
    provinces: ["京", "津", "沪", "渝", "蒙", "桂", "藏", "宁", "新", "冀", "豫", "鲁", "辽", "黑", "吉", "甘", "青", "苏", "鄂", "湘", "赣", "浙", "粤", "云", "闽", "琼", "晋", "川", "陕", "贵", "皖"],
    az: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    provinceIndex: 0, //省简称index
    cityIndex: 0, //市简称index
    brand_name: '', //当前品牌
    brand_id: '', //当前品牌的id
    Carmodel: [], //当前车型
    CarmodelIndex: 0, //当前车型index
    showCancel: true, //判断用户是否选择了品牌,如果没有选择,隐藏选择器
    displacementData: [], //当前排量
    RowiShow: true, //排量的状态,是否显示
    RowIndex: 0, //排量的index
    phone: '', //用户输入的手机号
    nickName: '', //用户输入的姓名
    car_brand: '', //用户输入的车牌号
    id: '',
    userData: '',
    jinji: '',
    hasCheInfo: '',

    // 图片地址
    upImg0: '',
    upImg1: ''
  },
  valueclear: function() {
    if (this.data.nickName == '') {
      this.setData({
        nickName: ''
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: app.gd.uid
    })
    wx.request({
      url: url + 'ubi/Home/userInfo',
      method: 'post',
      data: {
        uid: app.gd.uid
      },
      success: (res) => {
        if (res.data.code == 1) {
          let rdd = res.data.data[0];
          for (let i = 0; i < this.data.provinces.length; i++) {
            if (rdd.province == this.data.provinces[i]) {
              this.setData({
                provinceIndex: i
              })
            }
            if (rdd.city == this.data.az[i]) {
              this.setData({
                cityIndex: i
              })
            }
          }
          this.setData({
            userData: rdd,
            car_brand: rdd.plate.substring(2, 7),
            nickName: rdd.name,
            brand_name: rdd.car_name,
            phone: rdd.phone,
            jinji: rdd.urgent,
            hasCheInfo: true,
            upImg0: rdd.driving,
            upImg1: rdd.car_photos
          })
        } else {
          this.setData({
            hasCheInfo: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  brandData() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/getBrand',
      method: 'POST',
      data: {
        uid: this.data.uid
      },
      success: res => {}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.HeadPortrait()
    this.brandData()
    this.currentbrand()
    wx.removeStorage({
      key: 'brand_name',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'brand_id',
      success: function(res) {},
    })
  },
  HeadPortrait() {
    this.setData({
      userInfo: app.gd.userInfo
    })
  },
  provinceChange(e) { //选中当前的省简称 
    var index = e.detail.value
    this.setData({
      provinceIndex: index
    })
  },
  cityChange(e) { //选中当前的市简称
    var index = e.detail.value;
    this.setData({
      cityIndex: index
    })
  },
  Choicebrand() { //点击获取所有汽车品牌
    this.setData({
      CarmodelIndex: '',
      RowIndex: '',
      displacementData: [],
      RowiShow: true
    })
    if (!this.data.userData.name) {
      wx.navigateTo({
        url: '../brand/brand',
      })
    }
  },
  currentbrand() { //当前被选中的品牌
    var that = this;
    wx.getStorage({
      key: 'brand_name',
      success: function(res) {
        that.setData({
          brand_name: res.data,
          userData: ''
        })
      },
    })
    wx.getStorage({
      key: 'brand_id',
      success: res => {
        this.setData({
          brand_id: res.data,
          showCancel: false
        })
        this.getCarmodel()
      },
    })
  },
  getCarmodel() { //获取所有车型
    wx.request({
      url: url + 'ubi/Home/getAudi',
      data: {
        brand_id: this.data.brand_id
      },
      success: res => {
        if (res.data.code == 1) {
          var data = res.data.data,
            arr = [];
          for (var i in data) {
            arr.push(data[i])
          }
          this.setData({
            Carmodel: arr
          })
        }
      }
    })
  },
  clickL() {
    if (this.data.userData == "") {
      if (this.data.Carmodel.length < 1) { //如果没有选择品牌,告诉用户先选择品牌,才能选择车型
        this.setData({
          showCancel: true
        })
        wx.showModal({
          title: '提示',
          content: '请先选择品牌',
          showCancel: false,
        })
      }
    }
  },
  Carmodelchange(e) { //车型选择器,发生改变时,根据index拿取当前数据
    this.setData({

    })
    var brand_id = this.data.brand_id,
      Carmodel = this.data.Carmodel;
    var index = e.detail.value;
    this.setData({
      CarmodelIndex: index
    })
    console.log('id', this.data.Carmodel[index])
    var id = this.data.Carmodel[index].id
    this.displacement(brand_id, Carmodel[index], id)
  },
  displacement(brand_id, carType, id) { //获取排量

    wx.request({
      url: url + 'ubi/Home/getDpm',
      data: {
        brand_id: brand_id,
        type: carType,
        id: id
      },
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            displacementData: res.data.data,

          })
        }
      }
    })
  },
  Rowchange(e) { //获取当前选择排量
    var index = e.detail.value;
    this.setData({
      RowIndex: index,
      id: this.data.displacementData[index].id
    })

  },
  bindDisplacement() {
    if (this.data.userData == "") {
      if (this.data.displacementData.length < 1) { //判断用户是否,选择了车型,如果不选择车型,没办法选择排量
        this.setData({
          Row_iShow: true
        })
        wx.showModal({
          title: '提示',
          content: '请先选择车型',
          showCancel: false,
        })
      } else {
        this.setData({
          RowiShow: false
        })
      }
    }
  },
  nameChange(e) { //获取用户输入的姓名
    var name = e.detail.value;
    this.setData({
      nickName: name
    })
    console.log('输入的姓名', this.data.nickName)
  },
  phoneChange(e) { //获取用户输入的手机号 
    var val = e.detail.value;
    this.setData({
      phone: val
    })
  },
  jinjiChange(e) {
    var val = e.detail.value;
    this.setData({
      jinji: val
    })
  },
  carbrandChange(e) { //获取用户输入的车牌号
    var car = e.detail.value;
    this.setData({
      car_brand: car
    })
    console.log("输入的车牌", this.data.car_brand)
  },
  upDateConfirm() {
    let td = this.data;
    if (td.hasCheInfo && (!td.upImg0 || !td.upImg1)) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    }
    wx.request({
      url: url + 'ubi/Home/updateInfo',
      method: 'POST',
      data: {
        uid: app.gd.uid,
        phone: td.phone,
        urgent: td.jinji,
        driving: td.upImg0,
        car_photos: td.upImg1
      },
      success: (res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success: (res2) => {
              // ，
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
  confirm() { //点击确认保存信息
    var phone = this.data.phone,
      nickName = this.data.nickName,
      car_brand = this.data.car_brand,
      brand_name = this.data.brand_name,
      Carmodel = this.data.Carmodel[this.data.CarmodelIndex],
      displacementData = this.data.displacementData[this.data.RowIndex];
    var Phone_Validation = /^1[23456789]\d{9}$/, //手机号验证
      userName = /^[\u4E00-\u9FA5A-Za-z]+$/; //验证姓名

    if (!userName.test(nickName)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确姓名',
        showCancel: false
      })
      return;
    }
    if (car_brand.length < 5) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的车牌号',
        showCancel: false
      })
      return;
    }
    if (!brand_name || !Carmodel || !displacementData) {
      wx.showModal({
        title: '提示',
        content: '请完善车辆信息',
        showCancel: false
      })
      return;
    }
    if (!Phone_Validation.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '输入的手机号有误',
        showCancel: false
      })
      return;
    }
    let province = this.data.provinces[this.data.provinceIndex],
      city = this.data.az[this.data.cityIndex],
      cur_Brand = province + city + car_brand,
      uid = this.data.uid,
      car_cate_id = this.data.brand_id,
      jinji = this.data.jinji;
    wx.request({
      url: url + 'ubi/Home/updateInfo',
      method: 'POST',
      data: {
        uid: app.gd.uid,
        car_cate_id: this.data.id,
        plate: cur_Brand,
        province: province,
        city: city,
        name: nickName,
        phone: phone,
        urgent: jinji
      },
      success: res => {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })

  },
  onUnload: function() {
    wx.removeStorage({
      key: 'brand_name',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'brand_id',
      success: function(res) {},
    })
  },
  uoloadImg: function(e) { //上传保单信息图片
    let index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
      },
      success: (res) => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
        })
        wx.uploadFile({
          url: app.gd.globalUrl + 'ubi/Home/cbImg',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          success: upres => {
            wx.hideToast();
            console.log("图片接口返回", upres)
            if (upres.statusCode == 413) {
              wx.showToast({
                title: '图片太大',
                icon: 'none',
                duration: 1500,
              })
            } else {
              wx.showToast({
                title: '上传成功',
              })
              console.log(JSON.parse(upres.data).img, "tupianlianjie")
              this.setData({
                ['upImg' + index]: JSON.parse(upres.data).img
              })
            }
          }
        })
      },
    })
  },
  removeImg: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['upImg' + index]: ''
    })
  }
})
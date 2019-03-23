// pages/upload/upload.js
const app = getApp();
const imgUrl = app.gd.imgUrl;
let myDate = new Date();
let util = require('../../utils/util.js');
let nowYY = myDate.getFullYear();
let nowMM = myDate.getMonth() + 1;
let nowDD = myDate.getDate();
let nowDate = nowYY + '-' + nowMM + '-' + nowDD;
console.log(nowDate);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    companyList: [{
      name: '123'
    }, {
      name: '123'
    }, {
      name: '123'
    }],
    companyIndex: 0,
    uid: '', //当前用户id
    types: [],
    CarownerData: {}, //车主信息
    dateStart: '2018-08-15',
    nowDate: nowDate,
    dateEnd: '2019-08-15',
    imagesList1: "", //用户需要上传的四张照片
    imagesList2: "",
    imagesList3: "",
    imagesList4: "",
    imagesList5: "",
    pc_img1: "",
    pc_img2: '',
    pc_img3: '',
    pc_img4: '',
    pc_img5: '',
    unfold: false, //是否展开险种选项
    vin: '', //用户输入的vin码
    InsuranceData: [], //所有保险公司
    policy_num: '', //用户输入的保单号
    sum: 0,
    totalData: {},
    check: [], //险种类型,是否被选中
    inputVla: [],
    Photograph: [{
        img: imgUrl + '/img/car.png',
        name: '车牌照'
      },
      {
        img: imgUrl + '/img/chepai.png',
        name: '行驶证'
      },
      {
        img: imgUrl + '/img/Risk_type.png',
        name: '保单首页'
      },
      // {
      //   img: imgUrl + '/img/sum.png',
      //   name: '商业险'
      // },
      // {
      //   img: imgUrl + '/img/home_page.png',
      //   name: '强制险'
      // },
    ],
    primaryImg: '',
    imgState: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  VINinput(e) { //获取用户输入的VIN码
    console.log(e)
    var vin = e.detail.value
    this.setData({
      vin: vin
    })
  },
  InsuranceType() { //获取所有保险公司
    wx.request({
      url: app.gd.globalUrl + 'ubi/Refund/policy',
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            InsuranceData: res.data.data
          })
        }
      }
    })
  },
  PolicyChange(e) { //获取用户输入的保单号
    this.setData({
      policy_num: e.detail.value
    })
  },
  RiskSpecies() { //获取所有险种
    wx.request({
      url: app.gd.globalUrl + 'ubi/Refund/policyType',
      success: res => {
        console.log(res)
        var data = [];
        var inputVal = [],
          check = [];
        let li = res.data.data;
        for (var i = 0; i < li.length; i++) {
          data.push({
            type: li[i].type,
            value: '',
            disable: false,
            isShow: false
          })
        }
        console.log(data)
        console.log(inputVal)
        this.setData({
          types: data,
          // inputVla: inputVal,
          // check: check
        })

      }
    })
  },
  checkChange(e) { //checkbox选中,进行计算总价
    console.log("checkChange", e)
    var index = e.currentTarget.dataset.id,
      that = this;
    // 修改选中状态
    let check = that.data.types;
    check[index].isShow = !check[index].isShow;
    that.setData({
      types: check
    })
    // 计算
    that.calc();
  },
  moneyIput(e) { //input发生改变时并且checkbox选中,进行计算
    var index = e.currentTarget.dataset.id,
      that = this;
    var reg = /^[1-9]+\d*$/;
    console.log("输入 ", e)
    // 验证输入
    if (reg.test(e.detail.value) || e.detail.value == '') {
      // 赋值 
      that.setData({
        ['types[' + index + '].value']: e.detail.value,
        ['types[' + index + '].isShow']: true
      })
    } else {
      that.setData({
        ['types[' + index + '].value']: 0
      })
    }
    // 计算
    that.calc();
  },
  // 根据选中状态计算
  calc: function() {
    let that = this,
      t = that.data.types,
      sum = 0;
    for (let i = 0; i < t.length; i++) {
      if (t[i].isShow && (t[i].value != '')) {
        sum += parseInt(t[i].value);
      }
    }
    that.setData({
      sum: sum
    })
  },
  bindstartChange(e) { //用户选择投保时间,获取当前的时间
    this.setData({
      dateStart: e.detail.value
    })
  },
  bindendChange(e) { //用户选择截止时间,获取当前的时间
    this.setData({
      dateEnd: e.detail.value
    })
  },
  onLoad: function(options) {
    if (options) {
      this.setData({
        uid: options.uid
      })
    }
    this.carUserInfo();
  },

  changeCompany(e) { //用户选择的险种
    this.setData({
      companyIndex: e.detail.value
    });
    console.log(e.detail.value)
  },
  unfold: function() { //展开险种选项 
    this.setData({
      unfold: !this.data.unfold
    })
    if (this.data.unfold) {
      console.log(this.data.types)
      this.setData({
        types: this.data.types
      })
    }
    console.log(this.data.check)
    // if (!this.data.unfold){
    //    console.log(this.data.inputVla)
    //    var inputVal=[],
    //        check=[];
    //   for (var i = 0; i < this.data.inputVla.length;i++){
    //        inputVal.push({value:''})
    //        check.push({isShow:false})
    //   }
    //   this.setData({
    //     inputVla: inputVal,
    //     sum:0,
    //     check: check
    //   })
    // }
  },
  uoloadImg: function(e) { //上传保单信息图片
    var index = e.currentTarget.dataset.img;
    console.log('我是' + index)
    var that = this;
    wx.chooseImage({
      count: 1,
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
      },
      success: function(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        var data = res.tempFilePaths[0];
        console.log(res)
        wx.uploadFile({
          url: app.gd.globalUrl + 'ubi/Refund/cbImg',
          filePath: res.tempFilePaths[0],
          name: 'pc_img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          success: res => {
            console.log(res)
            if (res.statusCode == 413) {
              wx.showToast({
                title: '图片太大',
                icon: 'none',
                duration: 1500,
              })
            } else {
              var data = res.data.substring(1, res.data.length - 1);

              wx.showToast({
                title: '上传成功',
              })
              if (index == 0) { //判断用户点击上传哪张图片
                that.setData({
                  pc_img1: data,
                  imagesList1: data
                })
              } else if (index == 1) {
                that.setData({
                  pc_img2: data,
                  imagesList2: data
                })
              } else if (index == 2) {
                that.setData({
                  pc_img3: data,
                  imagesList3: data
                })
              } else if (index == 3) {
                that.setData({
                  pc_img4: data,
                  imagesList4: data
                })
              } else if (index == 4) {
                that.setData({
                  pc_img5: data,
                  imagesList5: data
                })
              } 
            }
          }
        })
      },
    })
  },
  Originalmap(e) { //点击拍照实例,查看原图
    console.log(e)
    var current = e.currentTarget.dataset.src,
      Photograph = e.currentTarget.dataset.list,
      imgList = [];
    for (var i = 0; i < Photograph.length; i++) {
      imgList.push(Photograph[i].img)
    }
    wx.previewImage({
      current: current,
      urls: imgList
    })
  },
  bindDateChange: function(e) { //用户选择的截止时间
    this.setData({
      dateEnd: e.detail.value
    });
  },
  imgUrl() { //操作img,把用户上传的图片保存到数组中
    var img = []
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i]) {
        img.push(arguments[i])
      }
    }
    return img;
  },
  SelectType() { //把用户选中的类型并且值不为空的时候,保存到数组
    var name_price = []
    for (var i = 0; i < this.data.types.length; i++) {
      console.log(this.data.types[i])
      if (this.data.types[i].isShow && this.data.types[i].value) {
        var types = this.data.types[i].type,
          value = this.data.types[i].value;
        name_price.push({
          type: types,
          value: value
        })
      }
    }
    return name_price;
  },
  skipSubmit: function() {
    var img1 = this.data.imagesList1,
      img2 = this.data.imagesList2,
      img3 = this.data.imagesList3,
      img4 = this.data.imagesList4,
      img5 = this.data.imagesList5;
    var imgList = this.imgUrl(img1, img2, img3, img4, img5)
    var pc_imgList = this.imgUrl(this.data.pc_img1, this.data.pc_img2, this.data.pc_img3, this.data.pc_img4, this.data.pc_img5)
    console.log(pc_imgList)
    var types = this.SelectType()
    var vin = this.data.vin,
      company = this.data.InsuranceData[this.data.companyIndex].company,
      policy_num = this.data.policy_num,
      name_price = types,
      total = this.data.sum,
      start_time = this.data.dateStart,
      end_time = this.data.dateEnd,
      uid = this.data.uid,
      CarownerData = this.data.CarownerData;
    var totalData = {
      vin: vin,
      company: company,
      policy_num: policy_num,
      name_price: name_price,
      img: imgList,
      total: total,
      start_time: start_time,
      end_time: end_time,
      CarownerData: CarownerData,
      u_id: this.data.uid,
      pc_img: pc_imgList
    }
    // vin   保险公司   保险号   险种  合计  开始时间  结束时间 图片数量
    if (!vin || !company || !policy_num || !name_price || !total || !start_time || !end_time || imgList.length < 3) {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      })
      wx.removeStorage({
        key: 'totalData'
      })
      return;
    }
    console.log(totalData)
    wx.setStorage({
      key: 'totalData',
      data: totalData,
    })
    wx.navigateTo({
      url: '../submit/submit?uid=' + this.data.uid
    })


  },
  //获取用户车辆信息
  carUserInfo() {
    var that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/userInfo',
      method: 'post',
      data: {
        uid: app.gd.uid
      },
      success: res => {
        if (res.data.code == 1) {
          that.setData({
            CarownerData: res.data.data[0]
          })
        } else {
          wx.showModal({
            title: '提醒',
            content: '您还没有填写车辆信息',
            showCancel: false,
            success: function(success) {
              if (success.confirm) {
                wx.redirectTo({
                  url: '../Mypersonal/Mypersonal',
                })
              }
            },
          })
        }
      }
    })
  },
  uoload: function() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.RiskSpecies()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.gd.aData = true;
    console.log(this.data.types)
    this.InsuranceType()
  },
})